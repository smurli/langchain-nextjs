import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const runtime = "nodejs"; // "edge"

import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { Document } from "langchain/document";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import { PromptTemplate } from "langchain/prompts";

import {
  RunnableSequence,
  RunnablePassthrough,
} from "langchain/schema/runnable";

import {
  BytesOutputParser,
  StringOutputParser,
} from "langchain/schema/output_parser";

dotenv.config();

type ConversationalRetrievalQAChainInput = {
  question: string;
  chat_history: VercelChatMessage[];
};

const combineDocumentsFn = (docs: Document[], separator = "\n\n") => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join(separator);
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
};

const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const condenseQuestionPrompt = PromptTemplate.fromTemplate(
  CONDENSE_QUESTION_TEMPLATE
);

const ANSWER_TEMPLATE = `You are a 3GPP Telecom specification expert helping software developers write 3GPP compliant code. 
Answer the question with specific and precise answers, for developers to impliment in code. 
Dont provide any information that is not in context.

Answer the question based only on the following context:
{context}

Question: {question}
`;
const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

// Handle POST requests to /api/chat/retrieval

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX!);
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );
    const retriever = vectorStore.asRetriever();

    // Open-AI Model
    const model = new ChatOpenAI({
      modelName: "gpt-4",
    });

    const standaloneQuestionChain = RunnableSequence.from([
      {
        question: (input: ConversationalRetrievalQAChainInput) =>
          input.question,
        chat_history: (input: ConversationalRetrievalQAChainInput) =>
          formatVercelMessages(input.chat_history),
      },
      condenseQuestionPrompt,
      model,
      new StringOutputParser(),
    ]);

    const answerChain = RunnableSequence.from([
      {
        context: retriever.pipe(combineDocumentsFn),
        question: new RunnablePassthrough(),
      },
      answerPrompt,
      model,
      new BytesOutputParser(),
    ]);

    const conversationalRetrievalQAChain =
      standaloneQuestionChain.pipe(answerChain);

    const stream = await conversationalRetrievalQAChain.stream({
      question: currentMessageContent,
      chat_history: previousMessages,
    });

    return new StreamingTextResponse(stream);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

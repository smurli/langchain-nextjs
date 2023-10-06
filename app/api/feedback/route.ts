import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const card = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    themeColor: "0072C6", // light blue
    summary: "Summary description",
    sections: [
      {
        activityTitle: "3GPP ChatGPT Feedback",
      },
      {
        title: "Feedback",
        facts: [
          {
            name: "FeedbackType",
            value: body.feedbackType,
          },
          {
            name: "Feedback Message",
            value: body.feedbackMessage,
          },
          {
            name: "Chat Messages",
            value: "<pre>" + body.chatMessage + "</pre>",
          },
        ],
      },
    ],
  };

  const res = await fetch(process.env.TEAMS_WEB_HOOK as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
    cache: "no-store",
  }).catch((err) => {
    console.log(err);
  });
  //   console.log("Teams Res:", res);
  return new Response("ok", { status: 200 });
}

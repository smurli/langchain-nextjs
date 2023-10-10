import { VscFeedback } from "react-icons/vsc";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useRef } from "react";
import { useChat } from "ai/react";

export function Feedback() {
  let inputRef = useRef<HTMLTextAreaElement | null>(null);
  let radioThumbUpRef = useRef<HTMLButtonElement | null>(null);

  const sendFeedback = async () => {
    const feedbackMessage = inputRef.current?.value;
    const chatMessage = document.getElementById("ai-chat-window")?.innerText;
    let feedbackType = "negative";
    if (
      radioThumbUpRef.current?.attributes.getNamedItem("data-state")?.value ==
      "checked"
    ) {
      feedbackType = "positive";
    }
    console.log("Feedback Message:", feedbackMessage, "Type:", feedbackType);
    console.log("Chat Message:", chatMessage);

    await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedbackMessage,
        feedbackType,
        chatMessage,
      }),
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <VscFeedback className="mr-2" /> Feedback
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Send Feedback</AlertDialogTitle>
          <AlertDialogDescription>
            <Textarea ref={inputRef} placeholder="Type your message here." />
            <RadioGroup
              defaultValue="t-up"
              className="flex justify-items-start mt-2"
            >
              <div className="flex items-center space-x-2 mr-4">
                <RadioGroupItem value="t-down" id="tdown" />
                <Label htmlFor="tdown">
                  <FaThumbsDown />
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem ref={radioThumbUpRef} value="t-up" id="tup" />
                <Label htmlFor="tup">
                  <FaThumbsUp />
                </Label>
              </div>
            </RadioGroup>{" "}
            <p className="flex pt-2">
              <b>
                Note: Content of current chat window will be attched with this
                message.
              </b>
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={sendFeedback}>Send</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

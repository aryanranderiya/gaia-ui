"use client";

import { MessageBubble } from "@/registry/new-york/ui/message-bubble";

export default function MessageBubbleGrouped() {
  return (
    <div className="flex w-full flex-col gap-8 p-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Grouped Received Messages</h3>
        <div className="flex flex-col">
          <MessageBubble
            message="Hey! I have a few things to tell you"
            variant="received"
            grouped="first"
          />
          <MessageBubble
            message="First, the project looks amazing"
            variant="received"
            grouped="middle"
          />
          <MessageBubble
            message="Second, I love the design"
            variant="received"
            grouped="middle"
          />
          <MessageBubble
            message="And finally, great work! 🎉"
            variant="received"
            grouped="last"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Grouped Sent Messages</h3>
        <div className="flex flex-col">
          <MessageBubble
            message="Thanks so much!"
            variant="sent"
            grouped="first"
          />
          <MessageBubble
            message="I really appreciate the feedback"
            variant="sent"
            grouped="middle"
          />
          <MessageBubble
            message="It means a lot to me 😊"
            variant="sent"
            grouped="last"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { MessageBubble } from "@/registry/new-york/ui/message-bubble";

export default function MessageBubbleSimple() {
  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Received Messages</h3>
        <div className="flex flex-col gap-3">
          <MessageBubble
            message="Hey there! How's it going?"
            variant="received"
          />
          <MessageBubble
            message="This is a single message bubble on the left side"
            variant="received"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold">Sent Messages</h3>
        <div className="flex flex-col gap-3">
          <MessageBubble
            message="I'm doing great, thanks for asking!"
            variant="sent"
          />
          <MessageBubble
            message="This is a single message bubble on the right side"
            variant="sent"
          />
        </div>
      </div>
    </div>
  );
}

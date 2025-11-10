"use client";

import { ChatConversation } from "@/registry/new-york/ui/message-bubble";

export default function MessageBubbleDefault() {
  const messages = [
    {
      id: "1",
      variant: "received" as const,
      messages: ["Hey! How are you doing?"],
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      variant: "sent" as const,
      messages: ["I'm doing great! Just working on some new features."],
      timestamp: "10:31 AM",
    },
    {
      id: "3",
      variant: "received" as const,
      messages: [
        "That sounds exciting!",
        "What are you building?",
        "I'd love to hear more about it.",
      ],
      timestamp: "10:32 AM",
    },
    {
      id: "4",
      variant: "sent" as const,
      messages: [
        "I'm building a new UI component library!",
        "It has beautiful iOS-style message bubbles just like these 😊",
      ],
      timestamp: "10:33 AM",
    },
    {
      id: "5",
      variant: "received" as const,
      messages: ["Wow, that looks amazing! Can I try it out?"],
      timestamp: "10:34 AM",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl">
      <ChatConversation messages={messages} />
    </div>
  );
}

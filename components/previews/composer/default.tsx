"use client";

import { useState } from "react";
import { Composer } from "@/registry/new-york/ui/composer";

export default function ComposerDefault() {
  const [message, setMessage] = useState("");

  const handleSubmit = (text: string) => {
    console.log("Message submitted:", text);
    alert(`Message sent: ${text}`);
  };

  return (
    <div className="flex w-full max-w-3xl justify-center mx-auto">
      <Composer
        value={message}
        onValueChange={setMessage}
        onSubmit={handleSubmit}
        placeholder="Type your message here..."
      />
    </div>
  );
}

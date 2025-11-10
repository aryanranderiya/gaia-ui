"use client";

import { useState } from "react";
import { Composer } from "@/registry/new-york/ui/composer";

export default function ComposerLoading() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (text: string) => {
    console.log("Message submitted:", text);
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      alert(`Response received for: ${text}`);
    }, 3000);
  };

  const handleStop = () => {
    console.log("Generation stopped");
    setIsLoading(false);
  };

  return (
    <div className="flex w-full max-w-3xl justify-center mx-auto">
      <div className="w-full space-y-4">
        <p className="text-sm text-zinc-400 text-center">
          {isLoading
            ? "Generating response..."
            : "Click send to see loading state"}
        </p>
        <Composer
          value={message}
          onValueChange={setMessage}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onStop={handleStop}
          placeholder="Send a message to see loading state..."
        />
      </div>
    </div>
  );
}

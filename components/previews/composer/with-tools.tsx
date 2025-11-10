"use client";

import { useState } from "react";
import { Code, FileText, Image, Search } from "lucide-react";
import { Composer } from "@/registry/new-york/ui/composer";

const SAMPLE_TOOLS = [
  {
    name: "code_review",
    category: "Development",
    description: "Review and analyze code for best practices",
    icon: <Code className="h-4 w-4" />,
  },
  {
    name: "summarize",
    category: "Writing",
    description: "Summarize long text into key points",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "image_analysis",
    category: "Vision",
    description: "Analyze and describe images",
    icon: <Image className="h-4 w-4" />,
  },
  {
    name: "web_search",
    category: "Search",
    description: "Search the web for information",
    icon: <Search className="h-4 w-4" />,
  },
];

export default function ComposerWithTools() {
  const [message, setMessage] = useState("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleSubmit = (text: string) => {
    console.log("Message submitted:", text, "Tool:", selectedTool);
    alert(`Message sent: ${text}\nTool: ${selectedTool || "none"}`);
    setSelectedTool(null);
  };

  const handleToolSelect = (toolName: string, toolCategory: string) => {
    console.log("Tool selected:", toolName, toolCategory);
    setSelectedTool(toolName);
  };

  return (
    <div className="flex w-full max-w-3xl justify-center mx-auto">
      <div className="w-full space-y-4">
        <p className="text-sm text-zinc-400 text-center">
          Type <kbd className="rounded bg-zinc-700 px-1.5 py-0.5">/</kbd> to
          browse tools
        </p>
        <Composer
          value={message}
          onValueChange={setMessage}
          onSubmit={handleSubmit}
          tools={SAMPLE_TOOLS}
          onToolSelect={handleToolSelect}
          selectedTool={selectedTool}
          onRemoveTool={() => setSelectedTool(null)}
          placeholder="Try typing / to see available tools..."
          showTools={true}
        />
      </div>
    </div>
  );
}

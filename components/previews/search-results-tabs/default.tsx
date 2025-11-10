"use client";

import { SearchResultsTabs } from "@/registry/new-york/ui/search-results-tabs";

export default function SearchResultsTabsDefault() {
  const searchResults = {
    web: [
      {
        title: "GAIA - Open Source AI Assistant",
        url: "https://heygaia.io",
        content:
          "GAIA is your proactive, personal AI assistant designed to increase your productivity. It goes beyond traditional assistants by automating tasks and managing your digital life.",
      },
      {
        title: "Next.js by Vercel - The React Framework",
        url: "https://nextjs.org",
        content:
          "Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.",
      },
      {
        title: "React - The library for web and native user interfaces",
        url: "https://react.dev",
        content:
          "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.",
      },
      {
        title: "The Experience Company - Design & Development",
        url: "https://experience.heygaia.io",
        content:
          "We design and build exceptional digital experiences. From concept to launch, we partner with startups and enterprises to create products people love.",
      },
    ],
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800",
    ],
    news: [
      {
        title: "AI Assistants Transform Productivity in 2025",
        url: "https://example.com/news/ai-productivity",
        content:
          "New AI assistant platforms are revolutionizing how people manage their digital workflows, with open-source solutions leading the charge.",
        score: 0.95,
        date: "2025-11-08",
      },
      {
        title: "Open Source Projects See Record Contributions",
        url: "https://example.com/news/open-source",
        content:
          "GitHub reports a 40% increase in contributions to open-source projects, with AI and productivity tools seeing the most growth.",
        score: 0.89,
        date: "2025-11-07",
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl">
      <SearchResultsTabs search_results={searchResults} />
    </div>
  );
}

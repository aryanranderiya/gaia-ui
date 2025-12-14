"use client";

import { TwitterCard } from "@/registry/new-york/ui/twitter-card";

export default function TwitterCardDefault() {
  return (
    <div className="w-full max-w-md">
      <TwitterCard
        author={{
          name: "GAIA",
          handle: "trygaia",
          avatar: "https://github.com/theexperiencecompany.png",
          verified: true,
        }}
        content="We just shipped 6 new components to our open source UI library! ✨ Built with React, Tailwind CSS, and accessible by default."
        timestamp={new Date(Date.now() - 1000 * 60 * 60 * 2)}
        likes={142}
        retweets={38}
        replies={12}
      />
    </div>
  );
}

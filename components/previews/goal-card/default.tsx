"use client";

import { GoalCard } from "@/registry/new-york/ui/goal-card";

export default function GoalCardDefault() {
  const goals = [
    {
      id: "1",
      title: "Launch MVP by end of quarter",
      progress: 75,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      roadmap: {
        title: "Launch MVP by end of quarter",
        nodes: [
          { id: "1", title: "Design", isComplete: true },
          { id: "2", title: "Development", isComplete: true },
          { id: "3", title: "Testing", isComplete: true },
          { id: "4", title: "Launch", isComplete: false },
        ],
      },
    },
    {
      id: "2",
      title: "Complete user onboarding flow",
      progress: 100,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
      roadmap: {
        title: "Complete user onboarding flow",
        nodes: [
          { id: "1", title: "Research", isComplete: true },
          { id: "2", title: "Design", isComplete: true },
          { id: "3", title: "Implement", isComplete: true },
        ],
      },
    },
    {
      id: "3",
      title: "Fix critical performance issues",
      progress: 30,
      createdAt: new Date(),
      roadmap: {
        title: "Fix critical performance issues",
        nodes: [
          { id: "1", title: "Profile", isComplete: true },
          { id: "2", title: "Optimize", isComplete: false },
          { id: "3", title: "Test", isComplete: false },
        ],
      },
    },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          {...goal}
          onClick={(id) => console.log("View goal:", id)}
        />
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
	SlashCommandDropdown,
	type Tool,
	type SlashCommandMatch,
} from "@/registry/new-york/ui/slash-command-dropdown";

const sampleTools: Tool[] = [
	{
		name: "send_email",
		category: "email",
		description: "Send an email to someone",
	},
	{
		name: "search_emails",
		category: "email",
		description: "Search through your emails",
	},
	{
		name: "create_event",
		category: "calendar",
		description: "Create a calendar event",
	},
	{
		name: "list_events",
		category: "calendar",
		description: "List upcoming events",
	},
	{
		name: "create_todo",
		category: "todos",
		description: "Create a new todo item",
	},
	{ name: "search_web", category: "search", description: "Search the web" },
	{
		name: "get_weather",
		category: "weather",
		description: "Get current weather",
	},
	{
		name: "send_notification",
		category: "notifications",
		description: "Send a notification",
	},
];

export default function SlashCommandDropdownDefault() {
	const [selectedCategory, setSelectedCategory] = useState("all");

	const matches: SlashCommandMatch[] = sampleTools.map((tool, index) => ({
		tool,
		score: 1 - index * 0.1,
	}));

	const filteredMatches =
		selectedCategory === "all"
			? matches
			: matches.filter((m) => m.tool.category === selectedCategory);

	const categories = ["all", ...new Set(sampleTools.map((t) => t.category))];

	return (
		<div className="relative w-full max-w-md h-96">
			<SlashCommandDropdown
				matches={filteredMatches}
				selectedIndex={0}
				onSelect={(match) => alert(`Selected: ${match.tool.name}`)}
				onClose={() => {}}
				position={{ top: 0, left: 0, width: 400 }}
				isVisible={true}
				openedViaButton={true}
				selectedCategory={selectedCategory}
				categories={categories}
				onCategoryChange={setSelectedCategory}
			/>
		</div>
	);
}

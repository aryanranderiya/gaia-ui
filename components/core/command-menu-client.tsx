"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import {
	File01Icon,
	GitPullRequestIcon,
	Home01Icon,
	HugeiconsIcon,
	Loading03Icon,
	Package01Icon,
} from "@/components/icons";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import type { NavSection } from "@/types/nav-item";

interface CommandMenuClientProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	navigation: NavSection[];
}

export function CommandMenuClient({
	open,
	setOpen,
	navigation,
}: CommandMenuClientProps) {
	const router = useRouter();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(!open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [open, setOpen]);

	const runCommand = React.useCallback(
		(command: () => void) => {
			setOpen(false);
			command();
		},
		[setOpen],
	);

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Navigation">
					<CommandItem onSelect={() => runCommand(() => router.push("/"))}>
						<HugeiconsIcon icon={Home01Icon} size={16} className="mr-2" />
						<span>Home</span>
					</CommandItem>
					<CommandItem onSelect={() => runCommand(() => router.push("/docs"))}>
						<HugeiconsIcon icon={File01Icon} size={16} className="mr-2" />
						<span>Documentation</span>
					</CommandItem>
					<CommandItem
						onSelect={() => runCommand(() => router.push("/docs/installation"))}
					>
						<HugeiconsIcon icon={Package01Icon} size={16} className="mr-2" />
						<span>Installation</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Actions">
					<CommandItem
						onSelect={() =>
							runCommand(() =>
								window.open(
									"https://github.com/heygaia/ui/issues/new?template=component_request.yml",
									"_blank",
								),
							)
						}
					>
						<HugeiconsIcon
							icon={GitPullRequestIcon}
							size={16}
							className="mr-2"
						/>
						<span>Request a Component</span>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				{navigation?.map((section) => (
					<React.Fragment key={section.title || "getting-started"}>
						<CommandGroup heading={section.title || "Getting Started"}>
							{section.items?.map((item) => (
								<CommandItem
									key={item.href}
									onSelect={() =>
										runCommand(() => {
											if (item.href.startsWith("http")) {
												window.open(item.href, "_blank");
											} else {
												router.push(item.href);
											}
										})
									}
								>
									<HugeiconsIcon
										icon={Loading03Icon}
										size={16}
										className="mr-2"
									/>
									<span>{item.title}</span>
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />
					</React.Fragment>
				))}
			</CommandList>
		</CommandDialog>
	);
}

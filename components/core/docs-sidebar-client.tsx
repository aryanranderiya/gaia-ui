"use client";

import type { IconSvgElement } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import {
	Download05Icon,
	Home09Icon,
	HugeiconsIcon,
	ImageCompositionIcon,
	MapsIcon,
	ShapeCollectionIcon,
	StatusIcon,
	UserLove01Icon,
} from "@/components/icons";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ComponentPreviewTooltip } from "@/registry/new-york/ui/component-preview-tooltip";
import type { NavSection } from "@/types/nav-item";
import { DiscordIcon, TwitterIcon } from "../icons/social-icons";

interface DocsSidebarClientProps {
	navigation: NavSection[];
}

// Map page titles to icons
const pageIcons: Record<string, IconSvgElement> = {
	Introduction: Home09Icon,
	Components: ShapeCollectionIcon,
	Installation: Download05Icon,
	"Status - Beta": StatusIcon,
	Roadmap: MapsIcon,
	Contributors: UserLove01Icon,
	Gallery: ImageCompositionIcon,
};

const socialIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
	Twitter: TwitterIcon,
	Discord: DiscordIcon,
};

export function DocsSidebarClient({ navigation }: DocsSidebarClientProps) {
	const pathname = usePathname();
	const { setOpenMobile } = useSidebar();

	// Extract component name from href (e.g., "/docs/components/todo-item" -> "todo-item")
	const getComponentName = (href: string): string | null => {
		const match = href.match(/\/docs\/components\/([^/]+)$/);
		return match ? match[1] : null;
	};

	return (
		<Sidebar className="top-14 h-[calc(100svh-3.5rem)] border-r-0!">
			<SidebarContent className="pl-4 pr-2 py-8">
				{navigation.map((section) => (
					<SidebarGroup key={section.title}>
						{section.title.length > 0 && section.title !== "Socials" && (
							<SidebarGroupLabel className="font-normal text-muted-foreground">
								{section.title}
							</SidebarGroupLabel>
						)}
						<SidebarGroupContent>
							<SidebarMenu>
								{section.items.map((item) => {
									const componentName = getComponentName(item.href);
									const isComponentPage = item.href.includes("/components/");
									const isExternalLink = item.href.startsWith("http");
									const PageIcon = pageIcons[item.title];
									const SocialIcon = socialIcons[item.title];

									// Brand colors for social icons
									const iconColor =
										item.title === "Discord"
											? "text-[#5865F2]"
											: item.title === "Twitter"
												? "text-[#1DA1F2]"
												: "text-foreground/50";

									const linkContent = (
										<>
											{item.icon ? (
												<Image
													src={item.icon}
													alt=""
													className="w-4 h-4"
													width={16}
													height={16}
												/>
											) : PageIcon ? (
												<HugeiconsIcon
													icon={PageIcon}
													size={17}
													className={cn(iconColor)}
												/>
											) : SocialIcon ? (
												<SocialIcon className={cn("w-4 h-4", iconColor)} />
											) : null}
											<span>{item.title}</span>
										</>
									);

									const menuButton = (
										<SidebarMenuButton
											asChild
											isActive={pathname === item.href}
											className="font-medium"
										>
											{isExternalLink ? (
												<a
													href={item.href}
													target="_blank"
													rel="noopener noreferrer"
												>
													{linkContent}
												</a>
											) : (
												<Link
													href={item.href}
													onClick={() => setOpenMobile(false)}
												>
													{linkContent}
												</Link>
											)}
										</SidebarMenuButton>
									);

									return (
										<SidebarMenuItem key={item.href}>
											{isComponentPage && componentName ? (
												<ComponentPreviewTooltip
													componentName={componentName}
													side="right"
													height={200}
												>
													{menuButton}
												</ComponentPreviewTooltip>
											) : (
												menuButton
											)}
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
		</Sidebar>
	);
}

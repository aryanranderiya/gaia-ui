"use client";

import Image from "next/image";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { FooterWordmark } from "@/registry/new-york/ui/footer-wordmark";
import { GrainOverlay } from "@/registry/new-york/ui/grain-overlay";

export interface FooterLink {
	/** Visible label of the link. */
	label: string;
	/** Destination URL (relative or absolute). */
	href: string;
	/** Opens in a new tab with rel="noopener noreferrer" when true. */
	external?: boolean;
}

export interface FooterSection {
	/** Column heading, rendered uppercase. */
	title: string;
	links: FooterLink[];
}

export interface FooterSocialLink extends FooterLink {
	/** Icon rendered inside the link (pass an aria-hidden icon element). */
	icon: React.ReactNode;
}

export interface FooterProps {
	/** Link columns rendered across the top of the footer. */
	sections: FooterSection[];
	/** Social icon links rendered in the bottom-right corner. */
	socialLinks?: FooterSocialLink[];
	/** Halftone wordmark config. Omit to hide the wordmark entirely. */
	wordmark?: { text: string; logoSrc?: string };
	/** Free-form slot in the bottom-left corner (status badge, copyright). */
	startSlot?: React.ReactNode;
	/** Free-form slot centered in the bottom bar (company mark, logo). */
	brandSlot?: React.ReactNode;
	/** Optional wallpaper image. Falls back to a CSS glow when omitted. */
	backgroundSrc?: string;
	/** Accent color of the fallback CSS glow. */
	glowColor?: string;
	className?: string;
}

/**
 * Landing-page footer with link columns, a halftone brand wordmark, and a
 * three-column bottom bar (start slot / brand slot / social links) over a
 * glowing backdrop. Designed dark: the glow and blend modes assume a dark
 * page beneath.
 */
export function Footer({
	sections,
	socialLinks,
	wordmark,
	startSlot,
	brandSlot,
	backgroundSrc,
	glowColor = "#00bbff",
	className,
}: FooterProps) {
	return (
		<footer
			className={cn("relative w-full overflow-hidden bg-black", className)}
		>
			{backgroundSrc ? (
				<Image
					src={backgroundSrc}
					alt=""
					fill
					sizes="100vw"
					className="pointer-events-none z-0 origin-bottom scale-150 select-none object-cover object-bottom"
				/>
			) : (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 z-0"
					style={{
						background: `radial-gradient(120% 90% at 50% 115%, ${glowColor} 0%, ${glowColor}66 30%, transparent 70%)`,
					}}
				/>
			)}

			{/* Fade the top edge into the page above so the backdrop never
			    reads as a hard line against the last section. */}
			<div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-background via-background/50 to-transparent" />

			{/* Film grain breaks up gradient banding in the glow. */}
			<GrainOverlay variant="surface" className="z-20" />

			{/* Content. Deliberately NO z-index on this wrapper: a stacking
			    context here would isolate blending and leave the wordmark's
			    mix-blend-mode with an empty backdrop. */}
			<div className="relative flex flex-col gap-8 px-6 pt-24 pb-4 sm:gap-10 sm:px-8 lg:px-10">
				<nav
					aria-label="Footer"
					className="mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-10"
				>
					{sections.map((section) => (
						<div key={section.title} className="flex flex-col items-start">
							<div className="mb-3 font-serif text-sm font-medium uppercase tracking-wider text-white">
								{section.title}
							</div>
							{section.links.map((link) => (
								<a
									key={link.href}
									href={link.href}
									target={link.external ? "_blank" : undefined}
									rel={link.external ? "noopener noreferrer" : undefined}
									className="rounded-sm py-1 text-sm text-zinc-200 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
								>
									{link.label}
								</a>
							))}
						</div>
					))}
				</nav>

				{wordmark && (
					<FooterWordmark
						text={wordmark.text}
						logoSrc={wordmark.logoSrc}
						className="mx-auto w-full max-w-7xl"
					/>
				)}

				{(startSlot || brandSlot || socialLinks?.length) && (
					// 3-column grid rather than flex+space-between, so the brand
					// mark stays centered as the side slots change width.
					<div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center justify-items-center gap-6 sm:grid-cols-3">
						<div className="sm:justify-self-start">{startSlot}</div>

						<div>{brandSlot}</div>

						<div className="flex items-center gap-4 sm:justify-self-end">
							{socialLinks?.map((link) => (
								<a
									key={link.href}
									href={link.href}
									target={link.external ? "_blank" : undefined}
									rel={link.external ? "noopener noreferrer" : undefined}
									aria-label={link.label}
									className="rounded-sm p-1 text-zinc-200 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
								>
									{link.icon}
								</a>
							))}
						</div>
					</div>
				)}
			</div>
		</footer>
	);
}

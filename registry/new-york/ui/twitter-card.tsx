"use client";

import Image from "next/image";
import type { FC } from "react";
import { cn } from "@/lib/utils";

/* X's own UI glyphs, inlined so the card needs no icon library and reads
 * exactly like the real thing. All are 24x24 filled paths. */
const X_PATHS = {
	reply:
		"M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z",
	retweet:
		"M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z",
	like: "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z",
	share:
		"M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z",
	more: "M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z",
	verified:
		"M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z",
} as const;

const XIcon: FC<{ d: string; size?: number; className?: string }> = ({
	d,
	size = 18.75,
	className,
}) => (
	<svg
		viewBox="0 0 24 24"
		width={size}
		height={size}
		fill="currentColor"
		aria-hidden="true"
		className={className}
	>
		<path d={d} />
	</svg>
);
export interface TwitterCardProps {
	author: {
		name: string;
		handle: string;
		avatar: string;
		verified?: boolean;
	};
	content: string;
	timestamp: string | Date;
	likes?: number;
	retweets?: number;
	replies?: number;
	/** Image attachment. Doubles as the poster frame when `video` is set. */
	media?: string;
	/** Video attachment (mp4). Autoplays muted in a loop, like on X. */
	video?: string;
	/** URL of the post on X. Links the timestamp and the share button. */
	href?: string;
	quoted?: {
		author: {
			name: string;
			handle: string;
			avatar: string;
		};
		content: string;
	};
	className?: string;
}

const formatNumber = (num: number): string => {
	if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
	if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
	return num.toString();
};

const formatTimestamp = (date: string | Date): string => {
	const d = new Date(date);
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

	if (diffHours < 1) return "Just now";
	if (diffHours < 24) return `${diffHours}h`;

	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
};

export const TwitterCard: FC<TwitterCardProps> = ({
	author,
	content,
	timestamp,
	likes = 0,
	retweets = 0,
	replies = 0,
	media,
	video,
	href,
	quoted,
	className,
}) => {
	return (
		<div
			className={cn(
				"rounded-3xl p-4",
				" bg-zinc-100 dark:bg-zinc-900",
				className,
			)}
		>
			{/* Author header */}
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3">
					<Image
						width={48}
						height={48}
						src={author.avatar}
						alt={author.name}
						className="h-12 w-12 rounded-full object-cover"
					/>
					<div>
						<div className="flex items-center gap-1">
							<span className="font-bold text-zinc-900 dark:text-zinc-100">
								{author.name}
							</span>
							{author.verified && (
								<XIcon
									d={X_PATHS.verified}
									size={18}
									className="text-[#1d9bf0]"
								/>
							)}
						</div>
						<div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
							<span className="text-sm">@{author.handle}</span>
							<span>·</span>
							{href ? (
								<a
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="View post on X"
									className="text-sm hover:underline"
								>
									{formatTimestamp(timestamp)}
								</a>
							) : (
								<span className="text-sm">{formatTimestamp(timestamp)}</span>
							)}
						</div>
					</div>
				</div>
				<button
					type="button"
					className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
					aria-label="More options"
				>
					<XIcon d={X_PATHS.more} />
				</button>
			</div>

			{/* Content */}
			<div className="mt-3">
				<p className="text-[15px] text-zinc-900 dark:text-zinc-100 whitespace-pre-line leading-relaxed">
					{content}
				</p>
			</div>

			{/* Media */}
			{video ? (
				<div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
					{/** biome-ignore lint/a11y/useMediaCaption: decorative product clip, muted */}
					<video
						src={video}
						poster={media}
						autoPlay
						muted
						loop
						playsInline
						controls
						className="w-full object-cover max-h-80"
					/>
				</div>
			) : (
				media && (
					<div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
						{/** biome-ignore lint/performance/noImgElement: no specific height and width */}
						<img
							src={media}
							alt="Tweet media"
							className="w-full object-cover max-h-80"
						/>
					</div>
				)
			)}

			{/* Quoted tweet */}
			{quoted && (
				<div
					className={cn(
						"mt-3 rounded-2xl border p-3",
						"border-zinc-200 dark:border-zinc-800",
					)}
				>
					<div className="flex items-center gap-2">
						<Image
							width={20}
							height={20}
							src={quoted.author.avatar}
							alt={quoted.author.name}
							className="h-5 w-5 rounded-full"
						/>
						<span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
							{quoted.author.name}
						</span>
						<span className="text-sm text-zinc-500 dark:text-zinc-400">
							@{quoted.author.handle}
						</span>
					</div>
					<p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
						{quoted.content}
					</p>
				</div>
			)}

			{/* Actions */}
			<div className="mt-4 flex items-center justify-between text-zinc-500 dark:text-zinc-400">
				<button
					type="button"
					className="flex items-center gap-1.5 rounded-full p-2 hover:bg-sky-50 hover:text-blue-500 dark:hover:bg-sky-900/20"
					aria-label="Reply"
				>
					<XIcon d={X_PATHS.reply} />
					{replies > 0 && (
						<span className="text-sm">{formatNumber(replies)}</span>
					)}
				</button>
				<button
					type="button"
					className="flex items-center gap-1.5 rounded-full p-2 hover:bg-green-50 hover:text-green-500 dark:hover:bg-green-900/20"
					aria-label="Retweet"
				>
					<XIcon d={X_PATHS.retweet} />
					{retweets > 0 && (
						<span className="text-sm">{formatNumber(retweets)}</span>
					)}
				</button>
				<button
					type="button"
					className="flex items-center gap-1.5 rounded-full p-2 hover:bg-pink-50 hover:text-pink-500 dark:hover:bg-pink-900/20"
					aria-label="Like"
				>
					<XIcon d={X_PATHS.like} />
					{likes > 0 && (
						<span className="text-sm">{formatNumber(likes)}</span>
					)}
				</button>
				{href ? (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Open post on X"
						className="rounded-full p-2 hover:bg-sky-50 hover:text-blue-500 dark:hover:bg-sky-900/20"
					>
						<XIcon d={X_PATHS.share} />
					</a>
				) : (
					<button
						type="button"
						className="rounded-full p-2 hover:bg-sky-50 hover:text-blue-500 dark:hover:bg-sky-900/20"
						aria-label="Share"
					>
						<XIcon d={X_PATHS.share} />
					</button>
				)}
			</div>
		</div>
	);
};

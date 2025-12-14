"use client";

import type { FC } from "react";
import { useState } from "react";
import {
	Tick02Icon,
	ArrowDown01Icon,
	AiMagicIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export interface AIModel {
	id: string;
	name: string;
	provider: string;
	icon?: string;
	isPro?: boolean;
	description?: string;
}

export interface ModelSelectorProps {
	models: AIModel[];
	selectedModel: AIModel;
	onSelect: (model: AIModel) => void;
	disabled?: boolean;
	className?: string;
}

export const ModelSelector: FC<ModelSelectorProps> = ({
	models,
	selectedModel,
	onSelect,
	disabled = false,
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (model: AIModel) => {
		onSelect(model);
		setIsOpen(false);
	};

	return (
		<div className={cn("relative", className)}>
			{/* Trigger button */}
			<button
				type="button"
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
				className={cn(
					"flex items-center gap-2 rounded-lg px-3 py-2 transition-colors w-full",
					"border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
					"hover:bg-zinc-50 dark:hover:bg-zinc-800",
					disabled && "opacity-50 cursor-not-allowed",
				)}
			>
				{selectedModel.icon ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={selectedModel.icon}
						alt={selectedModel.name}
						className="h-5 w-5 rounded"
					/>
				) : (
					<HugeiconsIcon
						icon={AiMagicIcon}
						size={20}
						className="text-blue-500"
					/>
				)}
				<div className="flex-1 text-left">
					<div className="flex items-center gap-2">
						<span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
							{selectedModel.name}
						</span>
						{selectedModel.isPro && (
							<span className="rounded bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
								PRO
							</span>
						)}
					</div>
					<span className="text-xs text-zinc-500 dark:text-zinc-400">
						{selectedModel.provider}
					</span>
				</div>
				<HugeiconsIcon
					icon={ArrowDown01Icon}
					size={16}
					className={cn(
						"text-zinc-400 transition-transform",
						isOpen && "rotate-180",
					)}
				/>
			</button>

			{/* Dropdown */}
			{isOpen && (
				<>
					{/* Backdrop */}
					<button
						type="button"
						className="fixed inset-0 z-40"
						onClick={() => setIsOpen(false)}
						onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
						aria-label="Close dropdown"
					/>

					{/* Dropdown menu */}
					<div
						className={cn(
							"absolute top-full left-0 right-0 z-50 mt-2 max-h-80 overflow-auto rounded-lg border shadow-lg",
							"border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
						)}
					>
						{models.map((model) => (
							<button
								key={model.id}
								type="button"
								onClick={() => handleSelect(model)}
								className={cn(
									"flex w-full items-center gap-3 px-3 py-3 text-left transition-colors",
									"hover:bg-zinc-50 dark:hover:bg-zinc-800",
									selectedModel.id === model.id &&
										"bg-blue-50 dark:bg-blue-950/30",
								)}
							>
								{model.icon ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={model.icon}
										alt={model.name}
										className="h-8 w-8 rounded"
									/>
								) : (
									<div className="flex h-8 w-8 items-center justify-center rounded bg-blue-100 dark:bg-blue-900">
										<HugeiconsIcon
											icon={AiMagicIcon}
											size={16}
											className="text-blue-500"
										/>
									</div>
								)}
								<div className="flex-1">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
											{model.name}
										</span>
										{model.isPro && (
											<span className="rounded bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
												PRO
											</span>
										)}
									</div>
									<span className="text-xs text-zinc-500 dark:text-zinc-400">
										{model.provider}
									</span>
									{model.description && (
										<p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
											{model.description}
										</p>
									)}
								</div>
								{selectedModel.id === model.id && (
									<HugeiconsIcon
										icon={Tick02Icon}
										size={20}
										className="text-blue-500"
									/>
								)}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
};

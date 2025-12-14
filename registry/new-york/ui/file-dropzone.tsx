"use client";

import { type FC, type ReactNode, useCallback, useState } from "react";
import {
	CloudUploadIcon,
	Cancel01Icon,
	File01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export interface DroppedFile {
	id: string;
	file: File;
	preview?: string;
}

export interface FileDropzoneProps {
	onFilesDropped: (files: DroppedFile[]) => void;
	accept?: string;
	multiple?: boolean;
	maxSize?: number; // in bytes
	maxFiles?: number;
	disabled?: boolean;
	className?: string;
	children?: ReactNode;
}

export const FileDropzone: FC<FileDropzoneProps> = ({
	onFilesDropped,
	accept,
	multiple = true,
	maxSize = 10 * 1024 * 1024, // 10MB default
	maxFiles = 10,
	disabled = false,
	className,
	children,
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [files, setFiles] = useState<DroppedFile[]>([]);
	const [error, setError] = useState<string | null>(null);

	const generateId = () => Math.random().toString(36).substring(2, 9);

	const processFiles = useCallback(
		(fileList: FileList | File[]) => {
			setError(null);
			const newFiles: DroppedFile[] = [];
			const fileArray = Array.from(fileList);

			if (!multiple && fileArray.length > 1) {
				setError("Only one file allowed");
				return;
			}

			if (files.length + fileArray.length > maxFiles) {
				setError(`Maximum ${maxFiles} files allowed`);
				return;
			}

			for (const file of fileArray) {
				if (maxSize && file.size > maxSize) {
					setError(
						`File ${file.name} exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`,
					);
					continue;
				}

				const droppedFile: DroppedFile = {
					id: generateId(),
					file,
					preview: file.type.startsWith("image/")
						? URL.createObjectURL(file)
						: undefined,
				};
				newFiles.push(droppedFile);
			}

			if (newFiles.length > 0) {
				const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
				setFiles(updatedFiles);
				onFilesDropped(updatedFiles);
			}
		},
		[files, maxFiles, maxSize, multiple, onFilesDropped],
	);

	const handleDragOver = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			if (!disabled) {
				setIsDragging(true);
			}
		},
		[disabled],
	);

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			setIsDragging(false);
			if (!disabled && e.dataTransfer.files.length > 0) {
				processFiles(e.dataTransfer.files);
			}
		},
		[disabled, processFiles],
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files && e.target.files.length > 0) {
				processFiles(e.target.files);
			}
		},
		[processFiles],
	);

	const removeFile = useCallback(
		(id: string) => {
			const file = files.find((f) => f.id === id);
			if (file?.preview) {
				URL.revokeObjectURL(file.preview);
			}
			const updatedFiles = files.filter((f) => f.id !== id);
			setFiles(updatedFiles);
			onFilesDropped(updatedFiles);
		},
		[files, onFilesDropped],
	);

	return (
		<div className={cn("space-y-3", className)}>
			{/* Dropzone area */}
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				className={cn(
					"relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors",
					isDragging
						? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
						: "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900",
					disabled && "opacity-50 cursor-not-allowed",
				)}
			>
				<input
					type="file"
					accept={accept}
					multiple={multiple}
					onChange={handleInputChange}
					disabled={disabled}
					className="absolute inset-0 cursor-pointer opacity-0"
					aria-label="File input"
				/>

				{children || (
					<>
						<HugeiconsIcon
							icon={CloudUploadIcon}
							size={40}
							className={cn(
								"mb-3",
								isDragging
									? "text-blue-500"
									: "text-zinc-400 dark:text-zinc-500",
							)}
						/>
						<p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
							{isDragging ? "Drop files here" : "Drag & drop files here"}
						</p>
						<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
							or click to browse
						</p>
						{maxSize && (
							<p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
								Max {Math.round(maxSize / 1024 / 1024)}MB per file
							</p>
						)}
					</>
				)}
			</div>

			{/* Error message */}
			{error && (
				<p className="text-sm text-red-500 dark:text-red-400">{error}</p>
			)}

			{/* File list */}
			{files.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{files.map((file) => (
						<div
							key={file.id}
							className={cn(
								"group relative flex items-center gap-2 rounded-lg p-2 pr-8",
								"bg-zinc-100 dark:bg-zinc-800",
							)}
						>
							{file.preview ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={file.preview}
									alt={file.file.name}
									className="h-10 w-10 rounded object-cover"
								/>
							) : (
								<div className="flex h-10 w-10 items-center justify-center rounded bg-zinc-200 dark:bg-zinc-700">
									<HugeiconsIcon
										icon={File01Icon}
										size={20}
										className="text-zinc-500 dark:text-zinc-400"
									/>
								</div>
							)}
							<div className="min-w-0">
								<p className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-300 max-w-32">
									{file.file.name}
								</p>
								<p className="text-xs text-zinc-500 dark:text-zinc-400">
									{(file.file.size / 1024).toFixed(1)} KB
								</p>
							</div>
							<button
								type="button"
								onClick={() => removeFile(file.id)}
								className={cn(
									"absolute top-1 right-1 rounded-full p-1 transition-colors",
									"text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600",
									"dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-300",
								)}
								aria-label={`Remove ${file.file.name}`}
							>
								<HugeiconsIcon icon={Cancel01Icon} size={12} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

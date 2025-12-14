"use client";

import { cn } from "@/lib/utils";
import { Cancel01Icon, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	useEffect,
	useState,
	type ClipboardEvent,
	type FC,
	type KeyboardEvent,
} from "react";

export interface EmailRecipient {
	email: string;
	isValid?: boolean;
}

export interface EmailComposeCardProps {
	subject: string;
	body: string;
	recipients: string[];
	mode?: "view" | "edit";
	recipientQuery?: string;
	onSubjectChange?: (subject: string) => void;
	onBodyChange?: (body: string) => void;
	onRecipientsChange?: (recipients: string[]) => void;
	onSend?: () => void;
	onCancel?: () => void;
	isSending?: boolean;
	className?: string;
}

const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email.trim());
};

export const EmailComposeCard: FC<EmailComposeCardProps> = ({
	subject: initialSubject,
	body: initialBody,
	recipients: initialRecipients,
	mode = "edit",
	recipientQuery,
	onSubjectChange,
	onBodyChange,
	onRecipientsChange,
	onSend,
	onCancel,
	isSending = false,
	className,
}) => {
	const [subject, setSubject] = useState(initialSubject);
	const [body, setBody] = useState(initialBody);
	const [emailChips, setEmailChips] = useState<EmailRecipient[]>(
		initialRecipients.map((email) => ({ email, isValid: isValidEmail(email) })),
	);
	const [currentInput, setCurrentInput] = useState("");
	const [errors, setErrors] = useState<{
		subject?: string;
		body?: string;
		recipients?: string;
	}>({});

	// Sync state with props
	useEffect(() => {
		setSubject(initialSubject);
	}, [initialSubject]);

	useEffect(() => {
		setBody(initialBody);
	}, [initialBody]);

	const addEmailChip = (email: string) => {
		const trimmedEmail = email.trim();
		if (
			trimmedEmail &&
			!emailChips.some((chip) => chip.email === trimmedEmail)
		) {
			const newChip = {
				email: trimmedEmail,
				isValid: isValidEmail(trimmedEmail),
			};
			const newChips = [...emailChips, newChip];
			setEmailChips(newChips);
			setCurrentInput("");
			setErrors((prev) => ({ ...prev, recipients: undefined }));
			onRecipientsChange?.(newChips.map((c) => c.email));
		}
	};

	const removeEmailChip = (emailToRemove: string) => {
		const newChips = emailChips.filter((chip) => chip.email !== emailToRemove);
		setEmailChips(newChips);
		onRecipientsChange?.(newChips.map((c) => c.email));
	};

	const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === "," || e.key === " ") {
			e.preventDefault();
			if (currentInput.trim()) {
				addEmailChip(currentInput);
			}
		} else if (
			e.key === "Backspace" &&
			!currentInput &&
			emailChips.length > 0
		) {
			const lastChip = emailChips[emailChips.length - 1];
			removeEmailChip(lastChip.email);
		}
	};

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedText = e.clipboardData.getData("text");
		const emails = pastedText.split(/[,;\s]+/).filter((email) => email.trim());
		for (const email of emails) {
			addEmailChip(email);
		}
	};

	const handleSend = () => {
		const newErrors: typeof errors = {};
		if (!subject.trim()) newErrors.subject = "Subject is required";
		if (!body.trim()) newErrors.body = "Body is required";
		if (emailChips.length === 0)
			newErrors.recipients = "At least one recipient is required";
		else {
			const invalidCount = emailChips.filter((c) => !c.isValid).length;
			if (invalidCount > 0)
				newErrors.recipients = `${invalidCount} invalid email(s)`;
		}

		setErrors(newErrors);
		if (Object.keys(newErrors).length === 0 && onSend) {
			onSend();
		}
	};

	return (
		<div
			className={cn(
				"flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800",
				className,
			)}
		>
			{/* Header */}
			<div>
				<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
					Review & Send Email
				</h2>
				<p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
					{recipientQuery
						? `AI composed this email based on: "${recipientQuery}"`
						: "Review and edit your email before sending"}
				</p>
			</div>

			{/* Form */}
			<div className="space-y-6">
				{/* Recipients */}
				<div className="space-y-2">
					<span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
						To <span className="text-red-500">*</span>
					</span>
					<div
						className={cn(
							"min-h-[56px] rounded-xl border-2 p-3 transition-colors bg-zinc-50 dark:bg-zinc-800/50",
							errors.recipients
								? "border-red-500"
								: "border-zinc-200 dark:border-zinc-700",
							"focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",
						)}
					>
						<div className="flex flex-wrap gap-2">
							{emailChips.map((chip) => (
								<span
									key={chip.email}
									className={cn(
										"inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium max-w-[200px]",
										chip.isValid
											? "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
											: "bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400",
									)}
								>
									<span className="truncate">{chip.email}</span>
									{mode === "edit" && (
										<button
											type="button"
											onClick={() => removeEmailChip(chip.email)}
											className={cn(
												"ml-1 rounded-full p-0.5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors",
												chip.isValid
													? "text-blue-600 dark:text-blue-400"
													: "text-red-600 dark:text-red-400",
											)}
										>
											<HugeiconsIcon icon={Cancel01Icon} size={10} />
										</button>
									)}
								</span>
							))}

							{mode === "edit" && (
								<input
									type="text"
									value={currentInput}
									onChange={(e) => setCurrentInput(e.target.value)}
									onKeyDown={handleInputKeyDown}
									onPaste={handlePaste}
									onBlur={() => {
										if (currentInput.trim()) {
											addEmailChip(currentInput);
										}
									}}
									placeholder={
										emailChips.length === 0
											? "Enter email addresses..."
											: "Add more emails..."
									}
									className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100"
								/>
							)}
						</div>
					</div>
					{errors.recipients && (
						<p className="text-xs text-red-500 mt-1">{errors.recipients}</p>
					)}
					{mode === "edit" && !errors.recipients && (
						<p className="text-xs text-zinc-500 mt-1">
							Press Enter, comma, or space to add emails. Use Backspace to
							remove last email.
						</p>
					)}
				</div>

				{/* Subject */}
				<div className="space-y-2">
					<label
						htmlFor="email-subject"
						className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
					>
						Subject <span className="text-red-500">*</span>
					</label>
					{mode === "edit" ? (
						<div className="relative">
							<input
								id="email-subject"
								type="text"
								value={subject}
								onChange={(e) => {
									setSubject(e.target.value);
									if (errors.subject)
										setErrors((p) => ({ ...p, subject: undefined }));
									onSubjectChange?.(e.target.value);
								}}
								placeholder="Email subject"
								className={cn(
									"w-full rounded-xl border-2 px-3 py-3 text-sm transition-all outline-none",
									"bg-transparent",
									errors.subject
										? "border-red-500"
										: "border-zinc-200 dark:border-zinc-700",
									"focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
									"placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100",
								)}
							/>
							{errors.subject && (
								<p className="text-xs text-red-500 mt-1 absolute -bottom-5">
									{errors.subject}
								</p>
							)}
						</div>
					) : (
						<p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 p-2">
							{subject}
						</p>
					)}
				</div>

				{/* Body */}
				<div className="space-y-2">
					<label
						htmlFor="email-body"
						className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
					>
						Body <span className="text-red-500">*</span>
					</label>
					{mode === "edit" ? (
						<div className="relative">
							<textarea
								id="email-body"
								value={body}
								onChange={(e) => {
									setBody(e.target.value);
									if (errors.body)
										setErrors((p) => ({ ...p, body: undefined }));
									onBodyChange?.(e.target.value);
								}}
								placeholder="Email body"
								rows={12}
								className={cn(
									"w-full rounded-xl border-2 px-3 py-3 text-sm transition-all outline-none resize-none",
									"bg-transparent",
									errors.body
										? "border-red-500"
										: "border-zinc-200 dark:border-zinc-700",
									"focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
									"placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100",
								)}
							/>
							{errors.body && (
								<p className="text-xs text-red-500 mt-1 absolute -bottom-5">
									{errors.body}
								</p>
							)}
						</div>
					) : (
						<p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed p-2">
							{body}
						</p>
					)}
				</div>
			</div>

			{/* Footer */}
			<div className="flex justify-end gap-3 mt-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						disabled={isSending}
						className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
					>
						Cancel
					</button>
				)}
				{onSend && mode === "edit" && (
					<button
						type="button"
						onClick={handleSend}
						disabled={isSending}
						className={cn(
							"inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors",
							"bg-blue-500 hover:bg-blue-600 shadow-sm shadow-blue-500/20",
							isSending && "opacity-50 cursor-not-allowed",
						)}
					>
						{isSending ? (
							<>
								<HugeiconsIcon
									icon={Loading03Icon}
									size={16}
									className="animate-spin"
								/>
								Sending...
							</>
						) : (
							<>
								Send Email
								{/* <HugeiconsIcon icon={SentIcon} size={16} /> */}
							</>
						)}
					</button>
				)}
			</div>
		</div>
	);
};

"use client";

import { EmailComposeCard } from "@/registry/new-york/ui/email-compose-card";
import { useState } from "react";

export default function EmailPreviewDefault() {
	const [isSending, setIsSending] = useState(false);

	return (
		<div className="w-full max-w-lg">
			<EmailComposeCard
				emailData={{
					subject: "Action Required: Project Update",
					body: "Hi team,\n\nPlease review the attached document and provide your feedback by EOD.\n\nThanks,\nAryan",
					to: ["team@example.com", "alice@example.com"],
				}}
				onSend={async (data) => {
					setIsSending(true);
					await new Promise((resolve) => setTimeout(resolve, 2000));
					setIsSending(false);
					console.log("Sent email:", data);
					alert("Email sent! Check console for data.");
				}}
			/>
		</div>
	);
}

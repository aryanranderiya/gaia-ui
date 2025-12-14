"use client";

import { EmailComposeCard } from "@/registry/new-york/ui/email-compose-card";

export default function EmailPreviewDefault() {
	return (
		<div className="w-full max-w-lg">
			<EmailComposeCard
				subject="Q4 Project Update - Action Required"
				body={`Hi Team,

I wanted to share an update on our Q4 progress. We've completed the initial phase of the project and are now moving into the testing stage.

Key highlights:
• Frontend components are 90% complete
• API integration is done
• Documentation is being finalized

Please review the attached materials and let me know if you have any questions.

Best regards,
Alex`}
				recipients={["team@company.com", "john@company.com"]}
				mode="view"
			/>
		</div>
	);
}

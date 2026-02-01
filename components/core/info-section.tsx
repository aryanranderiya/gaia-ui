interface InfoSectionProps {
	title: string;
	description: string;
	className?: string;
}

export function InfoSection({
	title,
	description,
	className = "",
}: InfoSectionProps) {
	return (
		<div className={`space-y-1 ${className}`}>
			<h2 className="text-lg font-semibold">{title}</h2>
			<p className="text-sm text-muted-foreground leading-relaxed">
				{description}
			</p>
		</div>
	);
}

"use client";

import Image from "next/image";
import {
	DiscordIcon,
	GithubIcon,
	HugeiconsIcon,
	Linkedin02Icon,
	NewTwitterIcon,
	YoutubeIcon,
} from "@/components/icons";
import {
	Footer,
	type FooterSection,
	type FooterSocialLink,
} from "@/registry/new-york/ui/footer";

const sections: FooterSection[] = [
	{
		title: "Product",
		links: [
			{ label: "Download", href: "#" },
			{ label: "Use Cases", href: "#" },
			{ label: "Marketplace", href: "#" },
			{ label: "Pricing", href: "#" },
			{ label: "Roadmap", href: "#" },
		],
	},
	{
		title: "Resources",
		links: [
			{ label: "Documentation", href: "#" },
			{ label: "Blog", href: "#" },
			{ label: "Release Notes", href: "#" },
			{ label: "Status", href: "#" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About", href: "#" },
			{ label: "Manifesto", href: "#" },
			{ label: "Contact", href: "#" },
			{ label: "Branding", href: "#" },
		],
	},
	{
		title: "Legal",
		links: [
			{ label: "Terms of Use", href: "#" },
			{ label: "Privacy Policy", href: "#" },
		],
	},
];

const socialLinks: FooterSocialLink[] = [
	{
		label: "Discord",
		href: "https://discord.heygaia.io",
		external: true,
		icon: <HugeiconsIcon icon={DiscordIcon} size={18} aria-hidden="true" />,
	},
	{
		label: "Twitter",
		href: "https://x.com/trygaia",
		external: true,
		icon: <HugeiconsIcon icon={NewTwitterIcon} size={18} aria-hidden="true" />,
	},
	{
		label: "GitHub",
		href: "https://github.com/theexperiencecompany",
		external: true,
		icon: <HugeiconsIcon icon={GithubIcon} size={18} aria-hidden="true" />,
	},
	{
		label: "YouTube",
		href: "https://youtube.com/@theexperiencecompany",
		external: true,
		icon: <HugeiconsIcon icon={YoutubeIcon} size={18} aria-hidden="true" />,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/company/heygaia",
		external: true,
		icon: <HugeiconsIcon icon={Linkedin02Icon} size={18} aria-hidden="true" />,
	},
];

export default function FooterDemo() {
	return (
		<div className="w-full overflow-hidden rounded-2xl bg-black">
			<Footer
				sections={sections}
				socialLinks={socialLinks}
				wordmark={{ text: "GAIA", logoSrc: "/media/logo.webp" }}
				startSlot={
					<span className="flex items-center gap-2 text-sm text-zinc-200">
						<span
							className="size-2 rounded-full bg-green-400"
							aria-hidden="true"
						/>
						All services are online
					</span>
				}
				brandSlot={
					<Image
						src="/media/logo.webp"
						alt="GAIA"
						width={40}
						height={40}
						className="size-10 select-none"
					/>
				}
			/>
		</div>
	);
}

"use client";

import { aeonik } from "@/app/fonts/aeonik";
import { FooterGlow } from "@/registry/new-york/ui/footer-glow";

export default function FooterGlowDemo() {
	return (
		<div className="w-full overflow-hidden rounded-2xl bg-black">
			<FooterGlow
				text="GAIA"
				logoSrc="/media/gaia_logo.png"
				backgroundSrc="/images/wallpapers/subtle_glow_deep_blues.webp"
				fontClassName={`${aeonik.className} font-bold`}
			/>
		</div>
	);
}

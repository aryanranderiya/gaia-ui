import localFont from "next/font/local";

// GAIA's display face (mapped to font-serif on the landing page). Used by
// the docs previews so ported components render with the real brand font.
export const aeonik = localFont({
	src: "./AeonikExtendedPro-Bold.woff2",
	weight: "700",
	style: "normal",
	variable: "--font-aeonik",
	display: "swap",
	fallback: ["system-ui", "sans-serif"],
});

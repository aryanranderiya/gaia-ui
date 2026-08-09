import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { NavItem, NavSection } from "@/types/nav-item";

const DOCS_PATH = path.join(process.cwd(), "content/docs");

// Display order for component categories; uncategorized files fall back to the
// directory-name section, unknown categories are appended alphabetically
const CATEGORY_ORDER = [
	"Charts",
	"Chat & AI",
	"Cards",
	"Buttons",
	"Files & Media",
	"Menus & Navigation",
	"Overlays & Tooltips",
	"Display",
];

/**
 * Get navigation items by scanning the docs directory and reading frontmatter
 */
export function getNavigation(): NavSection[] {
	const sections: NavSection[] = [];

	// Getting Started section - always first
	const gettingStartedItems: NavItem[] = [];

	sections.push({
		title: "Socials",
		items: [
			{
				title: "GAIA",
				href: "https://heygaia.io",
				icon: "/media/logo.svg",
			},
			{
				title: "Discord",
				href: "https://discord.heygaia.io",
			},
			{
				title: "Twitter",
				href: "https://twitter.com/trygaia",
			},
			{
				title: "llms.txt",
				href: "/llms.txt",
			},
		],
	});

	// Add index (Introduction)
	const indexPath = path.join(DOCS_PATH, "index.mdx");
	if (fs.existsSync(indexPath)) {
		const fileContent = fs.readFileSync(indexPath, "utf8");
		const { data } = matter(fileContent);
		gettingStartedItems.push({
			title: data.title || "Introduction",
			href: "/docs",
		});
	}

	// Add installation right after introduction
	const installationPath = path.join(DOCS_PATH, "installation.mdx");
	if (fs.existsSync(installationPath)) {
		const fileContent = fs.readFileSync(installationPath, "utf8");
		const { data } = matter(fileContent);
		gettingStartedItems.push({
			title: data.title || "Installation",
			href: "/docs/installation",
		});
	}

	// Add other root-level docs (excluding index and installation)
	const rootFiles = fs
		.readdirSync(DOCS_PATH)
		.filter(
			(file) =>
				file.endsWith(".mdx") &&
				file !== "index.mdx" &&
				file !== "installation.mdx",
		);

	for (const file of rootFiles) {
		const filePath = path.join(DOCS_PATH, file);
		const fileContent = fs.readFileSync(filePath, "utf8");
		const { data } = matter(fileContent);
		const slug = file.replace(/\.mdx$/, "");

		gettingStartedItems.push({
			title: data.title || slug,
			href: `/docs/${slug}`,
		});
	}

	if (gettingStartedItems.length > 0) {
		sections.push({
			title: "Welcome",
			items: gettingStartedItems,
		});
	}

	// Scan for subdirectories (e.g., components/)
	const dirs = fs.readdirSync(DOCS_PATH).filter((file) => {
		const fullPath = path.join(DOCS_PATH, file);
		return fs.statSync(fullPath).isDirectory();
	});

	for (const dir of dirs) {
		const dirPath = path.join(DOCS_PATH, dir);

		// Capitalize directory name, used as the fallback section title
		const fallbackTitle = dir
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");

		// Group files by frontmatter category; uncategorized files land in the
		// directory-name section
		const grouped = new Map<string, NavItem[]>();

		const files = fs
			.readdirSync(dirPath)
			.filter((file) => file.endsWith(".mdx"));

		for (const file of files) {
			const filePath = path.join(dirPath, file);
			const fileContent = fs.readFileSync(filePath, "utf8");
			const { data } = matter(fileContent);
			const slug = file.replace(/\.mdx$/, "");

			const category = data.category || fallbackTitle;
			if (!grouped.has(category)) grouped.set(category, []);
			grouped.get(category)?.push({
				title: data.title || slug,
				href: `/docs/${dir}/${slug}`,
			});
		}

		const categories = [...grouped.keys()].sort((a, b) => {
			const ia = CATEGORY_ORDER.indexOf(a);
			const ib = CATEGORY_ORDER.indexOf(b);
			if (ia === -1 && ib === -1) return a.localeCompare(b);
			if (ia === -1) return 1;
			if (ib === -1) return -1;
			return ia - ib;
		});

		for (const category of categories) {
			const items = grouped.get(category);
			if (items && items.length > 0) {
				sections.push({ title: category, items });
			}
		}
	}

	return sections;
}

/**
 * Main navigation items (for navbar)
 */
export const mainNav = [
	{
		title: "Documentation",
		href: "/docs",
	},
	{
		title: "Components",
		href: "/docs/components",
	},
	{
		title: "Gallery",
		href: "/docs/gallery",
	},
];

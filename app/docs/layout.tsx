import { DocsSidebar } from "@/components/core/docs-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="border-b">
			<SidebarProvider className="min-h-[calc(100svh-3.5rem)]">
				<DocsSidebar />
				<div className="min-w-0 flex-1 px-6">
					<div className="sticky top-14 z-20 -mx-6 flex items-center gap-1 border-b bg-background px-4 py-2 md:hidden">
						<SidebarTrigger />
						<span className="text-sm text-muted-foreground">Menu</span>
					</div>
					{children}
				</div>
			</SidebarProvider>
		</div>
	);
}

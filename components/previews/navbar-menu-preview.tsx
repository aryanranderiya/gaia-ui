"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { ChevronDown, Github, Twitter, Linkedin, Youtube } from "lucide-react";
import { NavbarMenu as NavbarMenuComponent } from "@/registry/new-york/ui/navbar-menu";
import type { NavbarMenuSection } from "@/registry/new-york/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { FaDiscord, FaWhatsapp } from "react-icons/fa";
import { RaisedButton } from "@/registry/new-york/ui/raised-button";

export function NavbarMenu({
  activeMenu,
  sections,
  onClose,
}: {
  activeMenu: string;
  sections: NavbarMenuSection[];
  onClose?: () => void;
}) {
  return (
    <div className="relative w-full">
      {activeMenu && (
        <NavbarMenuComponent
          activeMenu={activeMenu}
          sections={sections}
          onClose={onClose}
        />
      )}
    </div>
  );
}

// Social Media Icons Components
export const SocialIcons = {
  Discord: () => <FaDiscord className="h-5 w-5" />,
  Twitter: () => <Twitter className="h-5 w-5" />,
  GitHub: () => <Github className="h-5 w-5" />,
  WhatsApp: () => <FaWhatsapp className="h-5 w-5" />,
  YouTube: () => <Youtube className="h-5 w-5" />,
  LinkedIn: () => <Linkedin className="h-5 w-5" />,
};

// Interactive Navbar with Menu Preview Component
export function NavbarWithMenu({
  sections,
  navItems,
}: {
  sections: NavbarMenuSection[];
  navItems?: Array<
    | { type: "link"; label: string; href: string }
    | { type: "dropdown"; label: string; menu: string }
  >;
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  // Default nav items if not provided
  const defaultNavItems = [
    { type: "dropdown", label: "Product", menu: "product" },
    { type: "dropdown", label: "Resources", menu: "resources" },
    { type: "dropdown", label: "Socials", menu: "socials" },
  ] as const;

  const items = navItems || defaultNavItems;

  const handleNavbarMouseLeave = () => {
    setActiveDropdown(null);
    setHoveredItem(null);
  };

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
    setHoveredItem(menu);
  };

  return (
    <div
      className={`p-4 min-h-[350px] bg-zinc-950 w-fit transition flex items-start justify-center mx-auto`}
    >
      <div
        className="relative mx-auto w-screen max-w-4xl"
        onMouseLeave={handleNavbarMouseLeave}
      >
        <div
          className={cn(
            "navbar_content flex h-14 w-full items-center justify-between border border-white/5 px-3 backdrop-blur-md transition-all",
            activeDropdown
              ? "rounded-t-2xl border-b-0 bg-zinc-950"
              : "rounded-2xl bg-zinc-900/30"
          )}
        >
          <div className="flex items-center gap-2 px-2">
            <Image
              src="/media/text_w_logo_white.webp"
              alt="GAIA Logo"
              width={100}
              height={30}
              className="object-contain"
            />
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-1 rounded-lg px-1 py-1">
            {items.map((item) =>
              item.type === "link" ? (
                <button
                  key={item.href}
                  className={cn(
                    "relative flex h-9 cursor-pointer items-center rounded-xl px-4 py-2 text-sm transition-colors hover:bg-zinc-800/40",
                    hoveredItem === item.label.toLowerCase()
                      ? "text-zinc-100"
                      : "text-zinc-400 hover:text-zinc-100"
                  )}
                  onMouseEnter={() => {
                    setHoveredItem(item.label.toLowerCase());
                    setActiveDropdown(null);
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              ) : (
                <button
                  key={item.menu}
                  className="relative flex h-9 cursor-pointer items-center rounded-xl px-4 py-2 text-sm text-zinc-400 capitalize transition-colors hover:text-zinc-100"
                  onMouseEnter={() => handleMouseEnter(item.menu)}
                >
                  {hoveredItem === item.menu && (
                    <div className="absolute inset-0 h-full w-full rounded-xl bg-zinc-800 transition-all duration-300 ease-out" />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <span>
                      {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                    </span>
                    <ChevronDown
                      height={17}
                      width={17}
                      className={cn(
                        "transition duration-200",
                        hoveredItem === item.menu && "rotate-180"
                      )}
                    />
                  </div>
                </button>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <RaisedButton color="#00bbff">Get Started</RaisedButton>
          </div>
        </div>

        {/* Navbar Menu */}
        <AnimatePresence>
          {activeDropdown && (
            <NavbarMenuComponent
              activeMenu={activeDropdown}
              sections={sections}
              onClose={() => setActiveDropdown(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

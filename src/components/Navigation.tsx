"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: "🏠" },
    { href: "/budget", label: "Budget", icon: "💰" },
    { href: "/chat", label: "AI", icon: "💬" },
    { href: "/split", label: "Split", icon: "🤝" },
    { href: "/social", label: "Social", icon: "👥" },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-2xl border border-apple-gray/50 rounded-3xl shadow-apple-lg z-50 md:static md:translate-x-0 md:bg-white/60 md:border-0 md:border-b md:border-apple-gray md:rounded-none md:shadow-none">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center gap-1 md:gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-4 py-3 md:px-4 md:py-4 transition-all duration-200 rounded-2xl md:rounded-none ${
                  isActive
                    ? "text-apple-blue font-semibold bg-apple-blue-subtle md:bg-transparent"
                    : "text-apple-gray-darker hover:text-apple-blue"
                }`}
              >
                <span className="text-xl md:text-lg">{item.icon}</span>
                <span className="text-xs md:text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}


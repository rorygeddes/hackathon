"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: "🏠" },
    { href: "/budget", label: "Budget", icon: "💰" },
    { href: "/chat", label: "Luni AI", icon: "💬" },
    { href: "/split", label: "Split", icon: "🤝" },
    { href: "/social", label: "Social", icon: "👥" },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg z-50 md:static md:translate-x-0 md:bg-transparent md:border-0 md:border-b md:border-gray-200 md:rounded-none md:shadow-none">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center gap-2 md:gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-4 transition-colors rounded-xl md:rounded-none ${
                  isActive
                    ? "text-black font-semibold bg-gray-50 md:bg-transparent"
                    : "text-gray-600 hover:text-gray-900"
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


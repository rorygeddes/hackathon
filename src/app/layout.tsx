import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Finance App - Your Financial Companion",
  description: "Track your finances, manage budgets, split expenses, and get AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-apple-gray-light">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pb-24 md:pb-0">
            {children}
          </main>
          <Navigation />
        </div>
      </body>
    </html>
  );
}


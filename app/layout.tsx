import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn ML Visual",
  description: "Blog về Machine Learning với visualizations tương tác",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-200 dark:border-gray-800">
            <nav className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">
                  Learn ML Visual
                </Link>
                <div className="flex gap-6">
                  <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Trang chủ
                  </Link>
                  <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">
                    Blog
                  </Link>
                  <Link href="/editor" className="hover:text-blue-600 dark:hover:text-blue-400">
                    ✏️ Editor
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-1 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
            <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
              <p>© 2025 Learn ML Visual. Built with Next.js & MDX.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}


import localFont from "next/font/local";
import Link from 'next/link';
import "@styles/globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Next.js + Tailwind CSS",
  description: "A starter template to build a web app with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <nav className="bg-white shadow-md py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-2xl font-semibold">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </div>
            <div className="space-x-4">
              <Link href="/cart" className="text-lg font-medium hover:text-blue-600 transition-colors">
                Cart
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

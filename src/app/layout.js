import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 border-b flex gap-6">
          <Link href="/" className="font-bold">Home</Link>
          <Link href="/cart">Cart</Link>
        </nav>

        {children}
      </body>
    </html>
  );
}

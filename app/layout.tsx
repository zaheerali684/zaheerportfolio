import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Zaheer Ali – Full Stack Developer",
  description:
    "Full Stack Developer & Graphic Designer passionate about building modern, responsive, and user-focused web applications.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "Zaheer Ali"],
  openGraph: {
    title: "Zaheer Ali – Full Stack Developer",
    description: "Portfolio of Zaheer Ali — Full Stack Developer & UI Designer",
    url: "https://zaheeralidev.vercel.app",
    siteName: "Zaheer Ali Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111827",
              color: "#f1f5f9",
              border: "1px solid #1e293b",
            },
          }}
        />
      </body>
    </html>
  );
}

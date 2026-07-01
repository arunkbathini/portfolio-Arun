import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/site";
import "./globals.css";
import "./components.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://your-domain.com"; // ← set your production URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | Salesforce DevOps & Cloud Platform Engineer`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} | Salesforce DevOps & Cloud Platform Engineer`,
    description: profile.intro,
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Salesforce DevOps & Cloud Platform Engineer`,
    description: profile.intro,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

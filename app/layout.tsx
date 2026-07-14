import type { Metadata } from "next";
import { Anton, Fraunces, Space_Grotesk, Inter, JetBrains_Mono, Geist } from "next/font/google";
import { profile, siteUrl } from "@/content/site";
import VisitTracker from "@/components/visit-tracker";
import "./globals.css";
import "./components.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | Cloud DevOps Engineer`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} | Cloud DevOps Engineer`,
    description: profile.intro,
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Cloud DevOps Engineer`,
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
      className={cn(spaceGrotesk.variable, inter.variable, jetbrainsMono.variable, anton.variable, fraunces.variable, "font-sans", geist.variable)}
    >
      <body>
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteContent } from "@/content/site";
import { ThemeRegistry } from "@/theme/ThemeRegistry";
import { Layout } from "@/components/Layout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteContent.eventName,
    template: "%s | " + siteContent.eventName,
  },
  description:
    "Hackathon multidisciplinar en Campus Monteprincipe con retos reales y foco en empleabilidad.",
  openGraph: {
    title: siteContent.eventName,
    description:
      "Hackathon en Campus Monteprincipe con retos reales y colaboracion empresarial.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <ThemeRegistry>
          <Layout>{children}</Layout>
        </ThemeRegistry>
      </body>
    </html>
  );
}

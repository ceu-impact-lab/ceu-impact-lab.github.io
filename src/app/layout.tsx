import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteContent } from "@/content/site";
import { ThemeRegistry } from "@/theme/ThemeRegistry";
import { Layout } from "@/components/Layout";

const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../../fonts/Poppins/Poppins-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../../fonts/Poppins/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/Poppins/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/Poppins/Poppins-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../fonts/Poppins/Poppins-Black.ttf", weight: "900", style: "normal" },
  ],
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
      <body className={poppins.variable}>
        <ThemeRegistry>
          <Layout>{children}</Layout>
        </ThemeRegistry>
      </body>
    </html>
  );
}

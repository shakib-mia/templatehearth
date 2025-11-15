import Script from "next/script";
import Animation from "./components/Animation/Animation";
import Layout from "./components/Layout/Layout";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

// const borel = Borel({
//   subsets: ["latin"],
//   weight: ["400"],
//   variable: "--font-borel",
// });

export const metadata = {
  metadataBase: new URL("https://templatehearth.vercel.app"),
  title: {
    default: "TemplateHearth – Ready. Set. Launch",
    template: "%s | TemplateHearth",
  },
  description: "Modern Designs for Ambitious Brands Simplified",

  keywords: [
    "website templates",
    "landing page templates",
    "Next.js templates",
    "HTML templates",
    "business templates",
    "portfolio templates",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "TemplateHearth – Ready. Set. Launch",
    description: "Modern Designs for Ambitious Brands Simplified",
    url: "https://templatehearth.vercel.app",
    siteName: "TemplateHearth",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TemplateHearth – Ready. Set. Launch",
    description: "Modern Designs for Ambitious Brands Simplified",
    site: "@TemplateHearth", // optional Twitter handle
  },

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "6mY5DUE_r-6_TFQBAgw6akpZgBgyjYxF4GXrYDaz6lI",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <Animation />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

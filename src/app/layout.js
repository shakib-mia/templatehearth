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
    default: "Template Hearth – Ready. Set. Launch",
    template: "%s | Template Hearth",
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
    title: "Template Hearth – Ready. Set. Launch",
    description: "Modern Designs for Ambitious Brands Simplified",
    url: "https://templatehearth.vercel.app",
    siteName: "Template Hearth",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Template Hearth – Ready. Set. Launch",
    description: "Modern Designs for Ambitious Brands Simplified",
    site: "@Template Hearth", // optional Twitter handle
  },

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "Zs-QzNH-jV2hUMXXG5kMstw34xaWCgYonUTtRwMOZTA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta
          name="google-site-verification"
          content="Zs-QzNH-jV2hUMXXG5kMstw34xaWCgYonUTtRwMOZTA"
        />
      </head>
      <body className="antialiased">
        <Animation />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

import Animation from "./components/Animation/Animation";
import Layout from "./components/Layout/Layout";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins", // optional, if you want CSS variable
});

export const metadata = {
  title: "Template Hearth - Ready. Set. Launch",
  description: "Modern Designs for Ambitious Brands Simplified",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`antialiased`}>
        <Animation />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

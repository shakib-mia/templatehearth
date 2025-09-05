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
  title: "Template Hearth - Ready. Set. Launch",
  description: "Modern Designs for Ambitious Brands Simplified",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`antialiased`}>
        <div id="hm-wrapper">
          <Navbar />

          <div id="hm-content">
            <Animation />
            <Layout>{children}</Layout>
          </div>
        </div>

        {/* <script
          src="http://127.0.0.1:5500/hearthmotion.js"
          type="module"
        ></script> */}
        {/* <Script src="http://127.0.0.1:5500/hearthmotion.js" /> */}
      </body>
    </html>
  );
}

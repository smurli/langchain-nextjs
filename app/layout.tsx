import "./globals.css";
import { Public_Sans } from "next/font/google";

import { Navbar } from "@/components/Navbar";

const publicSans = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>3GPP ChatGPT</title>
        <link rel="shortcut icon" href="/images/a5g-logo-4.png" />
        <meta
          name="description"
          content="3GPP ChatGPT - Ask any questions on 5G core related 3GPP Specs!"
        />
        <meta property="og:title" content="3GPP ChatGPT" />
        <meta
          property="og:description"
          content="3GPP ChatGPT - Ask any questions on 5G core related 3GPP Specs"
        />
        <meta property="og:image" content="/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="3GPP ChatGPT" />
        <meta
          name="twitter:description"
          content="3GPP ChatGPT - Ask any questions on 5G core related 3GPP Specs"
        />
        <meta name="twitter:image" content="/images/og-image.png" />
      </head>
      <body className={publicSans.className}>
        <div className="flex flex-col p-4 md:p-12 h-[100vh]">
          <Navbar></Navbar>
          {children}
        </div>
      </body>
    </html>
  );
}

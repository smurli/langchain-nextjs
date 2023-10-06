import "./globals.css";
import { Public_Sans } from "next/font/google";
import Script from "next/script";

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
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
            page_path: window.location.pathname,
          });
        `,
          }}
        />

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

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/Layout/Nav";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Image } from "@nextui-org/image";
import Footer from "@/components/Layout/Footer";
import Script from "next/script";
import { CookieConsent } from "@/components/Plugins/CookieConsent";
import Providers from "@/providers";

const font = Montserrat({ subsets: ["latin"], weight: "variable" });

export const metadata: Metadata = {
  metadataBase: new URL("https://muzuretravel.com"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="text-foreground">
      <body className={font.className}>
        <Providers>
          <Script src="https://cdn.wetravel.com/widgets/embed_checkout.js"></Script>
          <Script id="Chat" strategy="lazyOnload">
            {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/648d7530cc26a871b0231954/1h3493k60';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      `}
          </Script>
          <Nav />
          <div className=" fixed -right-52 bottom-12 bg-secondary my-auto top-12  h-screen opacity-10 shadow-inner -z-10 ">
            <Image
              src="/images/print.png"
              className=" object-cover bg-repeat-y"
              alt=""
            />
          </div>
          {children}
          <Footer />
          <CookieConsent />
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Anton_SC, Montserrat, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const anton = Anton_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sora",
  display: "swap",
});

const META_PIXEL_ID = "829732956774280";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070d1f",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://baseperformance.com.br"),
  title: "Protocolo Base Futebol | Base Performance",
  description:
    "Em 6 semanas, reconstrua a base atlética do futebol com o protocolo usado na recuperação do Berô Paraíba. Método EF Performance.",
  openGraph: {
    title: "Protocolo Base Futebol | Base Performance",
    description:
      "Reconstrua sua base atlética em 6 semanas. O mesmo protocolo da recuperação do Berô Paraíba.",
    images: ["/images/hq/bero-transformacao.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${anton.variable} ${montserrat.variable} ${sora.variable}`}>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

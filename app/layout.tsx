import type { Metadata, Viewport } from "next";
import { Anton_SC, Chivo_Mono, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const anton = Anton_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-src",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body-src",
  display: "swap",
});

const META_PIXEL_ID = "829732956774280";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.baseperformance.com.br"),
  title: "Protocolo Base Futebol de 6 semanas | Base Performance",
  description:
    "O protocolo de 6 semanas da recuperação do Berô Paraíba, hexacampeão do X1 Brazil. 3 treinos por semana, progressão pronta. R$ 59,90.",
  openGraph: {
    title: "Protocolo Base Futebol de 6 semanas | Base Performance",
    description:
      "Reconstrua sua base atlética em 6 semanas. O mesmo protocolo da recuperação do Berô Paraíba.",
    images: ["/images/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${chivoMono.variable} ${sora.variable}`}
    >
      <body>
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
            fbq('track', 'ViewContent', {
              content_name: 'protocolo-base-futebol',
              content_type: 'product',
              content_ids: ['protocolo-base-futebol'],
              value: 59.90,
              currency: 'BRL'
            });
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

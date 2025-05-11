import '../styles.scss';

import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { ViewTransitions } from 'next-view-transitions';
import { Head } from 'nextra/components';

import { ThemeSwitch } from '../components/theme-switch';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://blog.tomasreimers.com'),
  applicationName: 'Tomas Reimers Blog',
  twitter: {
    site: 'https://blog.tomasreimers.com',
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="📚">
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for blog.tomasreimers.com"
          href="/rss.xml"
        />
      </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <article
            className="container px-4 prose max-md:prose-sm dark:prose-invert"
            dir="ltr"
            data-pagefind-body
          >
            <ViewTransitions>
              {children}
              <small
                className="mt-32 block flex justify-between items-center"
                data-pagefind-ignore="all"
              >
                <span>Tomas Reimers © {new Date().getFullYear()}</span>
                <ThemeSwitch />
              </small>
            </ViewTransitions>
          </article>
        </ThemeProvider>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-JP5JYDLRTH"
        />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-JP5JYDLRTH');        
      `,
          }}
        />
      </body>
    </html>
  );
}

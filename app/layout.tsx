import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'The Temple Construct | Master Temple Contractor & Shilpa Shastra Architects Pan-India',
  description: 'Master Temple Contractor constructing grand stone & RCC temples across all 28 states of India. Dravidian Rajagopurams, Nagara spires, Vesara temples, and live on-site civil execution.',
  metadataBase: new URL('https://thetempleconstruction.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'The Temple Construct | Master Temple Contractor & Shilpa Shastra Architects Pan-India',
    description: 'Master Temple Contractor constructing grand stone & RCC temples across all 28 states of India.',
    url: 'https://thetempleconstruction.com',
    siteName: 'The Temple Construct',
    images: [
      {
        url: '/images/pawar_temples_logo.jpg',
        width: 1024,
        height: 1024,
        alt: 'Pawar Temples - Master Temple Contractor Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'The Temple Construct | Master Temple Contractor',
    description: 'Master Temple Contractor constructing grand stone & RCC temples across Pan-India.',
    images: ['/images/pawar_temples_logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Temple Construct',
    alternateName: ['Pawar Temples', 'Omkar Temple Construct'],
    url: 'https://thetempleconstruction.com',
    logo: 'https://thetempleconstruction.com/images/pawar_temples_logo.jpg',
    image: 'https://thetempleconstruction.com/images/pawar_temples_logo.jpg',
    description: 'Master Temple Contractor constructing grand stone and RCC temples across all 28 states of India according to Shilpa Shastra and Vedic Vastu.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91 95353 43935',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'mr'],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon & Touch Icons for Google Search and all browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/favicon-144x144.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#211813" />

        {/* Structured Data for Google Search Logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Marcellus&family=Noto+Serif+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

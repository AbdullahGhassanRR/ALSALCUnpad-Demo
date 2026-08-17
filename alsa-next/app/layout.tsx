import type { Metadata } from 'next';
import '@/app/globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import HeaderNavbar from '@/components/static/HeaderNavbar';
import FooterPreview from '@/components/dynamic/FooterPreview';

export const metadata: Metadata = {
  title: 'ALSA Local Chapter Universitas Padjajaran | ALSA LC Unpad',
  description: 'ALSA Local Chapter Universitas Padjadjaran — Always be One!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
        />
      </head>
      <body >
          <HeaderNavbar />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <FooterPreview />

      </body>
    </html>
  );
}

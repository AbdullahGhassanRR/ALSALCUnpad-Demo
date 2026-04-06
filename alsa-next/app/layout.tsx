import type { Metadata } from 'next';
import './globals.css';

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
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

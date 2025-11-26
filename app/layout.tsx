import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Shining Through The Year - MEC End of Year Concert',
  description: 'Join us at MyEnglishCourse End of Year Concert. Celebrating student growth, creativity, and achievements through performances.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${playfair.variable}`}>{children}</body>
    </html>
  );
}

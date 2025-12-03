import type { Metadata, Viewport } from 'next';
import './globals.css';
import NavigationBar from './components/NavigationBar';

import { Outfit } from 'next/font/google';  // 'Outfit' Google Font import using Next

const outfit_font = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DibsDash: Coordinate food and drinks with friends for your next gathering!',
  description: 'A simple party and potluck sign-up sheets app to coordinate food and drinks with others for free.',
}

// Next 15.x requires separate import for the Viewport!
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className={outfit_font.variable}>
        <body className="font-outfit">
          {/* <NavigationBar /> */}
          {children}
        </body>
      </html>
    )
  }
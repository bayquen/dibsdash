import './globals.css';

// To run app on dev server: `pnpm run dev` (or just npm)

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
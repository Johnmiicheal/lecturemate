import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Lecture mate',
  description: 'Lecture is now your mate',
}

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body>{children}</body>
      </html>
    )
  }
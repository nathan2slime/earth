import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'
import { AppChildren } from '~/types'

export const metadata: Metadata = {
  title: 'Earth',
  description: "DSCOVR's EPIC",
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const RootLayout = ({ children }: Readonly<AppChildren>) => {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
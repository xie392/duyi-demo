import type { Metadata } from 'next'
import "@/styles/globals.css"

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
}

interface RootLayoutProps {
    children: React.ReactNode,
}

export default function RootLayout({
    children
}: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body className='antialiased'>
                {children}
            </body>
        </html>
    )
}

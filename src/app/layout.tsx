import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { Affix } from '@/components/affix'

export const metadata: Metadata = {
    title: '渡一 Demo',
    description: '渡一 Demo 是一个基于 Next.js 的 React 应用，用于展示渡一的技术能力。',
    icons: '/favicon.ico'
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
                <Toaster />
                <Affix />
            </body>
        </html>
    )
}

import type { Metadata } from 'next'
import { Affix } from '@/components/affix'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { generateMdxDirsToMenu, generateRoutes } from '@/lib/mdx/read'
import { AppProvider } from '@/components/provider/app-provider'
import { DocsHeader } from '@/components/layout/docs-header'
import { MdxContainer } from '@/components/render/mdx-container'

import '@/styles/globals.css'

export const metadata: Metadata = {
    title: '渡一 Demo',
    description: '渡一 Demo 是一个基于 Next.js 的 React 应用，用于展示渡一的技术能力。',
    icons: '/favicon.ico'
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    const menus = generateMdxDirsToMenu()
    const routes = generateRoutes(menus)

    return (
        <html lang="en">
            <body className="w-full overflow-x-hidden">
                <AppProvider menus={menus} routes={routes}>
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset>
                            <DocsHeader />
                            <div className="w-full flex-shrink-0">
                                <MdxContainer>{children}</MdxContainer>
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </AppProvider>
                <Affix />
            </body>
        </html>
    )
}

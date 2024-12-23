import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { extractMDXMenuPaths, generateMdxDirsToMenu, generateRoutes } from '@/lib/mdx/read'
import { MDXPath } from '@/types/mdx'
import { AppProvider } from '@/components/provider/app-provider'
import { DocsHeader } from '@/components/layout/docs-header'

export const dynamicParams = false

export async function generateStaticParams() {
    const paths: MDXPath[] = extractMDXMenuPaths()
    const staticPaths = paths.map((path) => ({
        path: path.url
            .replace(/^\/docs\//, '')
            .split('/')
            .filter(Boolean)
    }))
    return staticPaths
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const menus = generateMdxDirsToMenu()
    const routes = generateRoutes(menus)

    return (
        <AppProvider menus={menus} routes={routes}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <DocsHeader />
                   <div className='w-full flex-shrink-0'>{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </AppProvider>
    )
}

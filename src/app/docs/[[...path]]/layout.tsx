import { AppSidebar } from '@/components/app-sidebar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { extractMDXMenuPaths, generateMdxDirsToMenu, generateRoutes } from '@/lib/mdx/read'
import { MDXPath } from '@/types/mdx'
import { AppProvider } from '@/components/app-provider'

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
                    <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </AppProvider>
    )
}

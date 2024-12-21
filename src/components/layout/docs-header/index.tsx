'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { decodePath } from '@/lib/utils'
import { Separator } from '@radix-ui/react-separator'
import { useParams } from 'next/navigation'
import { Fragment, useMemo } from 'react'

export const DocsHeader = () => {
    const { path } = useParams()

    const paths = useMemo(() => {
        if (Array.isArray(path)) {
            return decodePath(path)
        }
        return []
    }, [path])

    return (
        <header className="flex sticky z-50 top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{path}</BreadcrumbPage>
                            </BreadcrumbItem>
                            {index < paths.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
                        </Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    )
}

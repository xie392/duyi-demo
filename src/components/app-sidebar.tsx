'use client'

import { SearchForm } from '@/components/search-form'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarRail
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { FileType } from '@/utils/enum'
import { MenuItem } from '@/types/mdx'
import { Icon } from '@/components/ui/icon'
import { useParams } from 'next/navigation'
import { useCallback, useContext } from 'react'
import { AppContext } from '@/context/app-context'
import { CollapsibleMenu } from '@/components/sidebar-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { getKeysByPath } from '@/lib/utils'

const GenerateMenu = ({ items, path }: { items: MenuItem[]; path: string[] }) => {
    const LinkButton = useCallback((item: MenuItem) => {
        const Comp = item.type === FileType.File ? 'button' : 'div'
        return (
            <Comp className="flex w-full">
                <Icon name={item.type === FileType.File ? 'File' : 'Folder'} />
                <span className="select-none">{item.title}</span>
            </Comp>
        )
    }, [])

    return items.map((item) => (
        <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                        tooltip={item.title}
                        // isActive={isSamePath(path, item.url)}
                        asChild
                        data-state={item.url.includes(item.title) ? 'open' : 'closed'}
                    >
                        {LinkButton(item)}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full">
                    {item.items && item.items.length > 0 ? (
                        <SidebarMenuSub className="px-0 pl-3 w-full mx-0 border-transparent">
                            <GenerateMenu items={item.items} path={path} />
                        </SidebarMenuSub>
                    ) : null}

                    {!item.items?.length && item.type === FileType.Dir && (
                        <p className="pl-8 text-gray-500 text-xs my-2">这里什么都没有...</p>
                    )}
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    ))
}

export const AppSidebar = () => {
    const { path } = useParams()
    const { menus } = useContext(AppContext)

    return (
        <Sidebar>
            <SidebarHeader>
                <Link
                    href="/"
                    className="pl-2 mb-3 text-lg font-bold bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent"
                >
                    <Image src="/images/logo4.png" width={120} height={47} alt="logo" />
                </Link>
                <SearchForm />
            </SidebarHeader>
            <SidebarContent className="gap-0">
                <ScrollArea>
                    <SidebarGroup>
                        <SidebarGroupLabel>案例</SidebarGroupLabel>
                        <SidebarMenu className="px-2">
                            <CollapsibleMenu
                                items={menus}
                                defaultOpenKeys={getKeysByPath(path as string[], menus)}
                            />
                        </SidebarMenu>
                    </SidebarGroup>
                </ScrollArea>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}

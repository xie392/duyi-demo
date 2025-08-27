'use client'
import { cn, isSamePath, parsePath } from '@/lib/utils'
import { MenuItem } from '@/types/mdx'
import { FileType } from '@/utils/enum'
import { createContext, useContext, useEffect } from 'react'
import { Icon } from '@/components/ui/icon'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useSidebarStore } from '@/stores/sidebar'

const Ellipsis = dynamic(() => import('react-ellipsis-component'), { ssr: false })

interface CollapsibleMenuProps {
    items: MenuItem[]
    defaultOpenKeys?: string[]
}

type CollapsibleMenuContext = {
    openKeys: string[]
    handleToggle: (key: string) => void
}

const CollapsibleMenuContext = createContext<CollapsibleMenuContext | null>(null)

function useCollapsibleMenu() {
    const context = useContext(CollapsibleMenuContext)
    if (!context) {
        throw new Error('useCollapsibleMenu must be used within a CollapsibleMenuProvider')
    }
    return context
}

const CollapsibleMenu = ({ items = [], defaultOpenKeys = [] }: CollapsibleMenuProps) => {
    const { openKeys, setOpenKeys, toggleKey } = useSidebarStore()

    // 初始化时合并默认展开的keys和已保存的keys
    useEffect(() => {
        const mergedKeys = Array.from(new Set([...openKeys, ...defaultOpenKeys]))
        if (mergedKeys.length !== openKeys.length || !defaultOpenKeys.every(key => openKeys.includes(key))) {
            setOpenKeys(mergedKeys)
        }
    }, [defaultOpenKeys, openKeys, setOpenKeys])

    const handleToggle = (key: string) => {
        toggleKey(key)
    }

    return (
        <CollapsibleMenuContext.Provider value={{ openKeys, handleToggle }}>
            <CollapsibleMenuInset items={items} />
        </CollapsibleMenuContext.Provider>
    )
}

const CollapsibleMenuInset = ({ items }: Omit<CollapsibleMenuProps, 'defaultOpenKeys'>) => {
    const { handleToggle } = useCollapsibleMenu()
    const { path } = useParams() as { path: string[] }

    if(!items.length) return null
    
    return items.map((item) => {
        const isActive = isSamePath(parsePath(path), item.url)
        return (
            <div className="flex flex-col" key={item.key}>
                <CollapsibleMenuTrigger
                    item={item}
                    onClick={() => handleToggle(item.key)}
                    isActive={isActive}
                    data-key={item.key}
                />
                <CollapsibleMenuContent item={item} />
            </div>
        )
    })
}

interface CollapsibleMenuTriggerProps extends React.HTMLAttributes<HTMLAnchorElement | HTMLDivElement> {
    item: MenuItem
    isActive?: boolean
}

const CollapsibleMenuTrigger = ({ item, isActive = false, className, ...props }: CollapsibleMenuTriggerProps) => {
    const Component = item.type === FileType.File ? Link : 'div'

    return (
        <Component
            href={item.url}
            className={cn(
                'flex w-full cursor-pointer items-center gap-x-2 py-2 hover:text-primary overflow-hidden select-none',
                isActive && 'text-primary',
                className
            )}
            {...props}
        >
            <Icon name={item.type === FileType.File ? 'File' : 'Folder'} className="flex-shrink-0" />
            <div title={item.title}>
                <Ellipsis text={item.title} ellipsis maxLine={1} />
            </div>
        </Component>
    )
}

interface CollapsibleMenuContentProps {
    item: MenuItem
}

const CollapsibleMenuContent = ({ item }: CollapsibleMenuContentProps) => {
    const { openKeys } = useCollapsibleMenu()
    const isOpen = openKeys.includes(item.key)

    if (item.type === FileType.Dir && item?.items && item?.items?.length > 0) {
        return (
            <div
                className={cn(
                    'flex flex-col pl-3 items-center justify-between h-0 transition-all duration-300 ease-in-out overflow-hidden',
                    isOpen && 'h-auto'
                )}
            >
                <div className="px-0 w-full mx-0 border-transparent">
                    <CollapsibleMenuInset items={item.items} />
                </div>
            </div>
        )
    }

    return null
}

export { CollapsibleMenu }

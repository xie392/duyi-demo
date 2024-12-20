'use client'
import { cn, decodePath, isSamePath, parsePath } from '@/lib/utils'
import { MenuItem } from '@/types/mdx'
import { FileType } from '@/utils/enum'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '@/components/ui/icon'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { cloneDeep } from 'es-toolkit'

const Ellipsis = dynamic(() => import('react-ellipsis-component'), { ssr: false })

interface LinkButtonProps extends React.HTMLAttributes<HTMLAnchorElement | HTMLDivElement> {
    item: MenuItem
    isActive?: boolean
}

const LinkButton = ({ item, isActive = false, className, ...props }: LinkButtonProps) => {
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

interface CollapsibleProps {
    items: MenuItem[]
    defaultOpenKeys?: string[]
    path?: string[]
    onOpenChange?: (keys: string[]) => void
}

export const CollapsibleMenu = ({ items, defaultOpenKeys = [], path = [], onOpenChange }: CollapsibleProps) => {
    const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys)
    const openKesRef = useRef<string[]>(openKeys)

    // TODO: 提取出到本地存储
    const handleToggle = (key: string) => {
        const newOpendKeys: string[] = cloneDeep(openKesRef.current)
        if (newOpendKeys.includes(key)) {
            newOpendKeys.filter((k) => k !== key)
        }
        newOpendKeys.push(key)
        openKesRef.current = newOpendKeys
        setOpenKeys(newOpendKeys)
        console.log('newOpendKeys', key, newOpendKeys)
        // onOpenChange && onOpenChange(Array.from(openKeys))
    }

    // useEffect(() => {
    //     if (!path?.length) return
    //     setOpenKeys((prev) => {
    //         const updatedKeys = new Set(prev)
    //         decodePath(path).forEach((p) => updatedKeys.add(p))
    //         return updatedKeys
    //     })
    // }, [path])

    const renderedItems = useMemo(
        () =>
            items.map((menu) => {
                const isActive = isSamePath(parsePath(path), menu.url)
                const isOpen = openKeys.includes(menu.title)

                return (
                    <div className="flex flex-col" key={menu.url}>
                        <LinkButton
                            item={menu}
                            onClick={() => handleToggle(menu.title)}
                            isActive={isActive}
                            data-key={menu.title}
                        />
                        {menu.type === FileType.Dir && (
                            <div
                                className={cn(
                                    'flex flex-col pl-3 items-center justify-between h-0 transition-all duration-300 ease-in-out overflow-hidden',
                                    isOpen && 'h-auto'
                                )}
                            >
                                {menu.items?.length ? (
                                    <div className="px-0 w-full mx-0 border-transparent">
                                        <CollapsibleMenu items={menu.items} path={path} />
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-xs my-1 w-full">这里什么都没有...</p>
                                )}
                            </div>
                        )}
                    </div>
                )
            }),
        [items, openKeys, path, handleToggle]
    )

    return renderedItems
}

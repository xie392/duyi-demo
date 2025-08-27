'use client'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/app-context'
import { searchDocs } from '@/lib/utils'
import { MenuItem } from '@/types/mdx'
import Link from 'next/link'

// 保持组件的纯粹性，不使用任何状态，只使用props和context
export const SearchForm = () => {
    const [open, setOpen] = useState(false)

    // 添加键盘快捷键支持 (Ctrl/Cmd + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                setOpen(true)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* 桌面端搜索框 */}
            <DialogTrigger asChild>
                <Button
                    className="relative mr-1 hidden w-[300px] items-center justify-start bg-transparent text-sm md:flex rounded text-gray-400"
                    variant="outline"
                >
                    <Icon name="Search" />
                    <span className="inline-flex">搜索文档...</span>
                    <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
            </DialogTrigger>

            {/* 移动端搜索按钮 */}
            <DialogTrigger asChild>
                <Button
                    className="md:hidden"
                    variant="ghost"
                    size="icon"
                >
                    <Icon name="Search" />
                    <span className="sr-only">搜索</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>搜索文档</DialogTitle>
                </DialogHeader>
                <DialogCommand onClose={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}

// TODO：优化搜索结果展示，启用加载滚动或者分页或者虚拟列表
const DialogCommand = ({ onClose }: { onClose: () => void }) => {
    const { menus } = useContext(AppContext)
    const [keyword, setKeyword] = useState<string>('')
    const [searchResult, setSearchResult] = useState<MenuItem[]>([])

    useEffect(() => {
        setSearchResult(searchDocs(menus, keyword))
    }, [keyword, menus])

    const handleItemClick = () => {
        // 点击搜索结果后关闭弹窗
        onClose()
    }

    return (
        <Command>
            <CommandInput
                placeholder="请输入你要搜索的内容"
                value={keyword}
                onValueChange={(search) => setKeyword(search)}
            />
            <CommandList>
                <CommandEmpty>没有搜索结果</CommandEmpty>
                {searchResult.length > 0 && (
                    <CommandGroup heading="搜索结果">
                        {/* TODO: 优化搜索结果展示 */}
                        {searchResult.map((item) => (
                            <CommandItem 
                                className="flex justify-between items-center" 
                                key={item.title} 
                                asChild
                                onSelect={handleItemClick}
                            >
                                <Link href={item.url}>
                                    {item.title}
                                    <Icon name="File" className="mr-1 text-gray-500" />
                                </Link>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
        </Command>
    )
}

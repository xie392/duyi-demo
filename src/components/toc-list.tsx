'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { MDX_ID } from '@/utils/constants'
import { useParams } from 'next/navigation'

const Ellipsis = dynamic(() => import('react-ellipsis-component'), { ssr: false })

interface TitleListProps {
    id?: string
}

interface Title {
    id: string
    title: string
    herf: string
    level: number
}

export const TocList = ({ id = MDX_ID }: TitleListProps) => {
    const [titles, setTitles] = useState<Title[]>([])
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const scrollRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLLIElement[]>([])

    const { path } = useParams()

    useEffect(() => {
        const containerElement = document.getElementById(id)
        if (!containerElement) return
        const titleElements = containerElement.querySelectorAll('h1,h2,h3,h4,h5,h6')

        if (!scrollRef.current) return
        if (!titleElements.length) {
            scrollRef.current.style.display = 'none'
            return
        }

        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                // 找到所有正在相交的标题
                const intersectingEntries = entries.filter(entry => entry.isIntersecting)
                
                if (intersectingEntries.length > 0) {
                    // 如果有多个标题在视口中，选择最靠近顶部的那个
                    const topMostEntry = intersectingEntries.reduce((prev, current) => {
                        return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
                    })
                    
                    const index = list.findIndex((item) => item.id === topMostEntry.target.id)
                    if (index !== -1) {
                        setActiveIndex(index)
                    }
                } else {
                    // 如果没有标题在视口中，找到最接近视口顶部的标题
                    const allEntries = entries.map(entry => ({
                        entry,
                        index: list.findIndex(item => item.id === entry.target.id),
                        distance: Math.abs(entry.boundingClientRect.top)
                    })).filter(item => item.index !== -1)
                    
                    if (allEntries.length > 0) {
                        const closestEntry = allEntries.reduce((prev, current) => 
                            prev.distance < current.distance ? prev : current
                        )
                        setActiveIndex(closestEntry.index)
                    }
                }
            },
            { 
                rootMargin: '-10% 0px -60% 0px', 
                threshold: [0, 0.25, 0.5, 0.75, 1]
            }
        )

        const list: Title[] = Array.from(titleElements).map((element) => {
            const id = element.textContent ?? ''
            element.id = id
            observer.observe(element)
            return {
                id,
                title: id,
                herf: `#${id}`,
                level: parseInt(element.tagName.slice(1))
            }
        })

        setTitles(list)

        return () => {
            titleElements.forEach((element) => observer.unobserve(element))
            observer.disconnect()
        }
    }, [path])

    useEffect(() => {
        if (!listRef.current.length || !scrollRef.current) return
        const activeElement = listRef.current[activeIndex]
        if (!activeElement) return
        
        const container = scrollRef.current
        const containerHeight = container.clientHeight
        const elementTop = activeElement.offsetTop
        const elementHeight = activeElement.offsetHeight
        
        // 计算元素是否在可视区域内
        const isVisible = elementTop >= container.scrollTop && 
                         elementTop + elementHeight <= container.scrollTop + containerHeight
        
        if (!isVisible) {
            // 将活跃元素滚动到容器中央
            const targetScrollTop = elementTop - containerHeight / 2 + elementHeight / 2
            container.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: 'smooth'
            })
        }
    }, [activeIndex])

    return (
        <ScrollArea className="h-[480px]" ref={scrollRef}>
            <div className="relative">
                <div className="sticky top-0 bg-background z-10 py-3 text-gray-500 font-bold">目录</div>
                <ul>
                    {titles.map((title, index) => (
                        <li
                            key={index}
                            className={cn(
                                'py-2 w-full pl-3 border-l border-gray-200',
                                title.level === 2 && 'pl-6',
                                title.level === 3 && 'pl-9',
                                title.level === 4 && 'pl-12',
                                title.level === 5 && 'pl-[60px]',
                                title.level === 6 && 'pl-[72px]',
                                {
                                    'text-primary border-primary': activeIndex === index
                                }
                            )}
                            ref={(ref) => {
                                if (ref) listRef.current[index] = ref
                            }}
                        >
                            <Link href={title.herf} title={title.title}>
                                <Ellipsis text={title.title} ellipsis maxLine={1} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </ScrollArea>
    )
}

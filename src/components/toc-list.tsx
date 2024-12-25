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
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = list.findIndex((item) => item.id === entry.target.id)
                        if (index === -1) return
                        setActiveIndex(index)
                    }
                })
            },
            { rootMargin: '0px 0px -50% 0px', threshold: 1 }
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
        if (listRef.current.length < 10) return
        const activeElement = listRef.current[activeIndex]
        if (!activeElement) return
        scrollRef.current.scrollTo({
            top: activeElement.offsetHeight * (activeIndex - 5),
            behavior: 'auto'
        })
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

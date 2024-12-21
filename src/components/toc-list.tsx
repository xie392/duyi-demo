'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

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

export const TocList = ({ id = 'mdx-container' }: TitleListProps) => {
    const [titles, setTitles] = useState<Title[]>([])
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const siderbarRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

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
                    if (entry.isIntersecting && siderbarRef.current) {
                        console.log('entry.intersectionRatio ', entry.intersectionRatio)

                        if (entry.intersectionRatio >= 0.75) {
                            const index = list.findIndex((item) => item.id === entry.target.id)
                            if (index === -1) return
                            siderbarRef.current.style.transform = `translateY(${index * 40 + 40}px)`
                            setActiveIndex(index)
                        }
                    }
                })
            },
            { rootMargin: '0px 0px 0px 0px', threshold: 1 }
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
        console.log('titleElements', list)
    }, [])

    return (
        <ScrollArea className="h-[480px]" ref={scrollRef}>
            <div className="relative px-5">
                <div className="sticky top-0 bg-white z-10 py-3 text-gray-500 font-bold">目录</div>
                <ul>
                    {titles.map((title, index) => (
                        <li
                            key={index}
                            className={cn(
                                'py-2',
                                title.level === 2 && 'pl-3',
                                title.level === 3 && 'pl-6',
                                title.level === 4 && 'pl-9',
                                title.level === 5 && 'pl-12',
                                title.level === 6 && 'pl-[12px]',
                                {
                                    'text-primary': activeIndex === index
                                }
                            )}
                        >
                            <Link href={title.herf} title={title.title}>
                                <Ellipsis text={title.title} ellipsis maxLine={1} />
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="absolute left-0 bottom-0 w-0.5 bg-gray-200 h-full">
                    <span className="flex w-0.5 h-6 bg-primary" ref={siderbarRef}></span>
                </div>
            </div>
        </ScrollArea>
    )
}

import { getMDXContent } from '@/lib/mdx/read'
import { compileMDX } from 'next-mdx-remote/rsc'
import { TocList } from '@/components/toc-list'
import { Giscus } from '@/components/giscus'
import { components } from '@/components/mdx'
import Link from 'next/link'

import '@/styles/mdx.css'

interface RenderMDXProps {
    path: string[]
}

interface Frontmatter {
    title?: string
    updated?: string
    author?: string
    url?: string
}

const FrontmatterBlockquote = ({ frontmatter }: { frontmatter: Frontmatter }) => {
    return (
        <blockquote className="flex flex-col !py-4">
            <span className="mb-2 last-of-type:mb-0">
                作者：
                <Link href={`https://github.com/${frontmatter.author ?? 'xie392'}`} target="_blank">
                    {frontmatter.author ?? 'xie392'}
                </Link>
            </span>
            <span className="mb-2 last-of-type:mb-0">
                地址：
                <Link href={frontmatter.url ?? ''} target="_blank">
                    {frontmatter?.url}
                </Link>
            </span>
            <span className="mb-2  last-of-type:mb-0">更新时间：{frontmatter?.updated}</span>
        </blockquote>
    )
}

export const RenderMDX = async ({ path }: Readonly<RenderMDXProps>) => {
    const source = getMDXContent(path)

    const { content, frontmatter } = await compileMDX<Frontmatter>({
        source,
        options: { parseFrontmatter: true },
        components
    })

    return (
        <div className="flex w-full md:px-10">
            <div className="mx-auto w-full flex-1 flex-shrink-0 md:px-10 pt-6 pb-40 max-w-screen-xl">
                {frontmatter?.title && (
                    <h1 className="text-3xl font-bold mb-4 border-b pb-5 border-gray-200 dark:border-gray-700">
                        {frontmatter?.title}
                    </h1>
                )}

                <div className="mdx-container" id="mdx-container">
                    <FrontmatterBlockquote frontmatter={frontmatter} />
                    {content}
                </div>
                <Giscus />
            </div>

            <div className="min-w-80 w-auto xl:block hidden" id="mdx-sidebar">
                <div className="fixed top-16 h-full p-5">
                    <TocList id="mdx-container" />
                </div>
            </div>
        </div>
    )
}

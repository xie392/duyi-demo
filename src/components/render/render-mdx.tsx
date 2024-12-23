import { getMDXContent } from '@/lib/mdx/read'
import { compileMDX } from 'next-mdx-remote/rsc'
import { TocList } from '@/components/toc-list'
import { Giscus } from '@/components/giscus'
import { components } from '@/components/mdx'

import '@/styles/mdx.css'
import { MDX_ID } from '@/utils/constants'
import { Frontmatter, FrontmatterBlockquote } from '@/components/render/frontmatter-blockquote'

interface RenderMDXProps {
    path: string[]
}


export const RenderMDX = async ({ path }: Readonly<RenderMDXProps>) => {
    const source = getMDXContent(path)

    const { content, frontmatter } = await compileMDX<Frontmatter>({
        source,
        options: { parseFrontmatter: true },
        components
    })

    return (
        <div className='flex w-full md:px-10 px-4'>
            <div className="mx-auto flex-1 flex-shrink-0 md:px-10 pt-6 pb-40 max-w-screen-xl overflow-hidden">
                {frontmatter?.title && (
                    <h1 className="text-3xl font-bold mb-4 border-b pb-5 border-gray-200 dark:border-gray-700">
                        {frontmatter?.title}
                    </h1>
                )}

                <div className="mdx-container overflow-hidden flex-shrink-0" id={MDX_ID}>
                    <FrontmatterBlockquote frontmatter={frontmatter} />
                    {content}
                </div>

                {process.env.NODE_ENV === 'production' && <Giscus />}
            </div>

            <div className="min-w-80 w-auto xl:block hidden flex-shrink-0" id="mdx-sidebar">
                <div className="fixed top-16 h-full p-5">
                    <TocList id={MDX_ID} />
                </div>
            </div>
        </div>
    )
}

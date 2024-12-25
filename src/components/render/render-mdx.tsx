import { getMDXContent } from '@/lib/mdx/read'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@/components/mdx'

import { MDX_ID } from '@/utils/constants'
import { Frontmatter, FrontmatterBlockquote } from '@/components/render/frontmatter-blockquote'
import { Giscus } from '@/components/giscus'

import '@/styles/mdx.css'

interface RenderMDXProps {
    path: string[]
}

export const RenderMDXContent = async ({ path }: Readonly<RenderMDXProps>) => {
    const source = getMDXContent(path)

    const { content, frontmatter } = await compileMDX<Frontmatter>({
        source,
        options: { parseFrontmatter: true },
        components
    })

    return (
        <>
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
        </>
    )
}

import { getMDXContent } from '@/lib/mdx/read'
import { compileMDX } from 'next-mdx-remote/rsc'
import { CodeBlock } from '@/components/mdx/base/code-block'
import { TitleList } from '@/components/title-list'
import '@/styles/mdx.css'

interface RenderMDXProps {
    path: string[]
}

export const RenderMDX = async ({ path }: Readonly<RenderMDXProps>) => {
    const source = getMDXContent(path)

    const { content } = await compileMDX<{ title: string }>({
        source,
        options: { parseFrontmatter: true },
        components: {
            pre: ({ children }) => <CodeBlock>{children}</CodeBlock>
        }
    })

    return (
        <div className="flex w-full md:px-10">
            <div
                className="mdx-container max-w-[820px] mx-auto w-full flex-1 flex-shrink-0 md:px-10"
                id="mdx-container"
            >
                {content}
            </div>
            <div className="min-w-80 w-auto xl:block hidden" id="mdx-sidebar">
                <div className="fixed top-16 h-full p-5">
                    <TitleList id="mdx-container"  />
                </div>
            </div>
        </div>
    )
}

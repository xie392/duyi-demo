import { getMDXContent } from '@/lib/mdx/read'
import { compileMDX } from 'next-mdx-remote/rsc'
import { CodeBlock } from '@/components/mdx/base/code-block'
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
        <div className="flex w-full px-10">
            <div className="mdx-container max-w-[820px] mx-auto w-full flex-1 flex-shrink-0 px-10">{content}</div>
            <div className="min-w-64 w-auto">
                <div className="fixed top-20 h-full w-64 px-5">目录</div>
            </div>
        </div>
    )
}

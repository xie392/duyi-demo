import Link from "next/link"

export interface Frontmatter {
    title?: string
    updated?: string
    author?: string
    url?: string
}

export const FrontmatterBlockquote = ({ frontmatter }: { frontmatter: Frontmatter }) => {
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
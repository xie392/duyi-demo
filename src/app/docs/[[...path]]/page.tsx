import { RenderMDXContent } from '@/components/render/render-mdx'
import type { MDXParams } from '@/types/mdx'
import { extractMDXMenuPaths } from '@/lib/mdx/read'
import { MDXPath } from '@/types/mdx'

export const dynamicParams = false

export async function generateStaticParams() {
    const paths: MDXPath[] = extractMDXMenuPaths()
    const staticPaths = paths.map((path) => ({
        path: path.url
            .replace(/^\/docs\//, '')
            .split('/')
            .filter(Boolean)
    }))
    return staticPaths
}

export default async function RootPage({ params }: { params: Promise<MDXParams> }) {
    const { path } = await params
    return <RenderMDXContent path={path} />
}

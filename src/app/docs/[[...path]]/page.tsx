import { RenderMDX } from '@/components/render/render-mdx'
import type { MDXParams } from '@/types/mdx'

export default async function RootPage({ params }: { params: Promise<MDXParams> }) {
    const { path } = await params
    return <RenderMDX path={path} />
}

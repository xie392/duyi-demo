import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
// import remarkGfm from 'remark-gfm'

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx']
}

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: [],
        rehypePlugins: []
    }
})

export default withMDX(nextConfig)

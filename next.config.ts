import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
    transpilePackages: ['next-mdx-remote']
}

const withMDX = createMDX({
    extension: /\.mdx?$/
})

export default withMDX(nextConfig)

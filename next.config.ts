import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX()

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
    transpilePackages: ['next-mdx-remote'],
}

export default withMDX(nextConfig)

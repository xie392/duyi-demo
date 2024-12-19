import { MDXRemote } from 'next-mdx-remote/rsc'

interface RenderMDXProps {
    path: string[]
}

export const RenderMDX = ({ path }: Readonly<RenderMDXProps>) => {
    // console.log("patg", path);

    return <MDXRemote source={"22"} />
}

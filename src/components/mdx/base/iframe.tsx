'use client'

import { getCodeApi } from '@/api/code'
import { Button, buttonVariants } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { DetailedHTMLProps, IframeHTMLAttributes, useRef, useState } from 'react'
import { CodeBlock, CodeBlockProps } from './code-block'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useAsync } from 'react-use'

interface IFrameProps extends DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> {
    options: Partial<CodeBlockProps>
}

export const Iframe = ({ src = '', height = '350px', width = '100%', options, ...props }: IFrameProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [iframeShow, setIframeShow] = useState<boolean>(true)
    const state = useAsync(async () => getCodeApi({ path: src }))

    return (
        <div className="border w-full rounded-lg overflow-hidden bg-background my-3" ref={iframeRef}>
            <div className="text-neutral-100 border-b py-1.5 dark:text-neutral-500 flex justify-between items-center px-4">
                <div className="flex items-center gap-x-2">
                    <div className="rounded-full size-3 bg-[#E0443E]"></div>
                    <div className="rounded-full size-3 bg-[#DEA123]"></div>
                    <div className="rounded-full size-3 bg-[#1AAB29]"></div>
                </div>
                <div className="flex items-center gap-x-1.5">
                    <Button variant="ghost" size="icon" onClick={() => setIframeShow(!iframeShow)}>
                        <Icon name="CodeXml" className="text-gray-500" />
                    </Button>
                    <Link className={buttonVariants({ variant: 'ghost', size: 'icon' })} href={src} target="_blank">
                        <Icon name="SquareArrowOutUpRight" className="text-gray-500" />
                    </Link>
                </div>
            </div>
            <iframe
                className={cn('hidden bg-background', { block: iframeShow })}
                src={src}
                width={width}
                height={height}
                allowFullScreen
                {...props}
            />
            <CodeBlock
                className={cn('hidden my-0 border-transparent', { block: !iframeShow })}
             
                {...options}
            >
                <code className="language-html">{state.value?.data?.content}</code>
            </CodeBlock>
        </div>
    )
}

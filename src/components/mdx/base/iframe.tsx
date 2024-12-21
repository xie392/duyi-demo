'use client'

import { getCodeApi } from '@/api/code'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useAsyncEffect, useFullscreen } from '@reactuses/core'
import { DetailedHTMLProps, IframeHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import { CodeBlock } from './code-block'
import { useConfigStore } from '@/stores/config'
import 'highlight.js/styles/panda-syntax-light.min.css'

export const Iframe = ({
    src,
    height = '350px',
    width = '100%',
    ...props
}: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [isFullscreen, { toggleFullscreen }] = useFullscreen(iframeRef)

    const iframeHeight = useMemo(() => {
        return isFullscreen ? window.outerHeight : height
    }, [isFullscreen, height])

    const [iframeShow, setIframeShow] = useState<boolean>(true)
    const [content, setContent] = useState<string>('')

    useAsyncEffect(
        async () => {
            const { data } = await getCodeApi({ path: src ?? '' })
            console.log('data', data)
            setContent(data?.content)
        },
        () => null,
        []
    )

    // const isDark = useConfigStore((state) => state.isDark)

    // useAsyncEffect(
    //     async () => {
    //         // const isDark = th
    //         if (isDark) {
    //             // 插入  import 'highlight.js/styles/panda-syntax-light.min.css'
    //             const link = document.createElement('link')
    //             link.rel = 'stylesheet'
    //             link.href = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.0.1/build/styles/panda-syntax-light.min.css'
    //             document.head.appendChild(link)
    //         }
    //     },
    //     () => null,
    //     [isDark]
    // )

    return (
        <div
            className="border rounded-lg overflow-hidden bg-background"
            ref={iframeRef}
            style={{
                height: isFullscreen ? '100vh' : 'auto'
            }}
        >
            <div className="text-neutral-100 border-b py-1.5 dark:text-neutral-500 flex justify-between items-center px-4">
                <div className="flex items-center gap-x-2">
                    <div className="rounded-full size-3 bg-[#E0443E]"></div>
                    <div className="rounded-full size-3 bg-[#DEA123]"></div>
                    <div className="rounded-full size-3 bg-[#1AAB29]"></div>
                </div>
                <div className="flex items-center gap-x-1">
                    <Button variant="ghost" size="icon" onClick={() => setIframeShow(!iframeShow)}>
                        <Icon name="CodeXml" className="text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                        <Icon name={isFullscreen ? 'Shrink' : 'Fullscreen'} className="text-gray-500" />
                    </Button>
                </div>
            </div>
            {iframeShow ? (
                <iframe src={src} width={width} height={iframeHeight} allowFullScreen {...props} />
            ) : (
                <CodeBlock headerShow={false} blockClassName="bg-background border-transparent text-foreground">
                    <code className="language-html">{content}</code>
                </CodeBlock>
            )}
        </div>
    )
}

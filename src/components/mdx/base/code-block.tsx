'use client'
import hljs from 'highlight.js'
import 'highlight.js/styles/panda-syntax-dark.min.css'
import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { useClipboard } from '@reactuses/core'

export const CodeBlock = ({ children }: { children: React.ReactNode }) => {
    const preRef = useRef<HTMLPreElement>(null)
    const [isCopySuccess, setIsCopySuccess] = useState<boolean>(false)
    const [text, copy] = useClipboard()

    useEffect(() => {
        hljs.highlightAll()
    }, [children])

    const copyCode = () => {
        if (!preRef.current) return
        const code = preRef.current.textContent ?? ''

        copy(code)
        if (!text) return

        setIsCopySuccess(true)
        setTimeout(() => setIsCopySuccess(false), 2000)
    }

    return (
        <div className="rounded-lg shadow-lg bg-neutral-800 my-3 border text-white border-black dark:bg-neutral-900 dark:border-neutral-800">
            <div className="text-neutral-100 mb-2 pt-2 dark:text-neutral-500 flex justify-between items-center px-4">
                <div className="flex items-center gap-x-2">
                    <div className="rounded-full size-3 bg-[#E0443E]"></div>
                    <div className="rounded-full size-3 bg-[#DEA123]"></div>
                    <div className="rounded-full size-3 bg-[#1AAB29]"></div>
                </div>
                <div className="flex items-center gap-x-1">
                    {isCopySuccess && <span className="text-xs">复制成功！</span>}
                    <Button variant="ghost" size="icon" className="hover:bg-neutral-300" onClick={copyCode}>
                        <Icon name={isCopySuccess ? 'ClipboardCheck' : 'Clipboard'} />
                    </Button>
                </div>
            </div>
            <pre className="overflow-x-auto px-4 pb-4" ref={preRef}>
                {children}
            </pre>
        </div>
    )
}

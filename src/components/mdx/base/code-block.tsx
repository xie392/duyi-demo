'use client'

import { DetailedHTMLProps, HTMLAttributes, ReactElement, useMemo } from 'react'
import { themes } from 'prism-react-renderer'
import { useState, useEffect } from 'react'
import { onlyText } from 'react-children-utilities'
import { CodeBlock as CodeBlockComp, CodeBlockProps as CodeBlockCompProps } from 'react-code-block'
import { useCopyToClipboard } from 'react-use'

import { cn } from '@/lib/utils'
import { useConfigStore } from '@/stores/config'
import { Button } from '@/components/ui/button'
import { Copied } from '@/components/ui/icon'

interface CodeBlockProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
        Partial<Omit<CodeBlockCompProps, 'children'>> {}

export const CodeBlock = ({ children, words = [], lines = [], className = '' }: CodeBlockProps) => {
    const [, copyToClipboard] = useCopyToClipboard()
    const [isCopied, setIsCopied] = useState(false)
    const code = onlyText(children)
    const options = (children as ReactElement).props?.className?.split(',') ?? []
    const language = options?.[0]?.replace(/language-/, '') ?? 'js'

    const copyCode = () => {
        copyToClipboard(code)
        setIsCopied(true)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsCopied(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isCopied])

    const isDark = useConfigStore((state) => state.isDark)
    const theme = useMemo(() => (isDark ? themes.oneDark : themes.oneLight), [isDark])

    return (
        <CodeBlockComp code={code} language={language} lines={lines} words={words} theme={theme}>
            <div
                className={cn(
                    'bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 mt-6 rounded-xl code-block relative',
                    className
                )}
            >
                <CodeBlockComp.Code className="py-4 !px-0 overflow-x-auto">
                    {({ isLineHighlighted }) => (
                        <div className="table-row relative">
                            <CodeBlockComp.LineNumber className="table-cell text-right text-[10px] pl-4 pr-6 text-gray-400 select-none leading-6" />
                            <CodeBlockComp.LineContent className="table-cell w-full pr-4 text-sm leading-6 tracking-tight">
                                {isLineHighlighted && (
                                    <div className="absolute inset-0 bg-blue-500/10 border-l-2 border-blue-500" />
                                )}
                                <CodeBlockComp.Token className="relative">
                                    {({ isTokenHighlighted, children }) => (
                                        <span className={`relative ${isTokenHighlighted ? 'px-1' : ''}`}>
                                            {isTokenHighlighted && (
                                                <span className="absolute inset-x-0 -inset-y-0.5 rounded-md bg-blue-500/20" />
                                            )}
                                            <span className="relative">{children}</span>
                                        </span>
                                    )}
                                </CodeBlockComp.Token>
                            </CodeBlockComp.LineContent>
                        </div>
                    )}
                </CodeBlockComp.Code>

                <Button className="absolute right-3 top-3 shadow-sm" variant="ghost" size="icon" onClick={copyCode}>
                    <Copied isCopied={isCopied} className="size-4" />
                </Button>
            </div>
        </CodeBlockComp>
    )
}

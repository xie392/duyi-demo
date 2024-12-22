import { useEffect, useState } from 'react'

interface UseClipboardReturnType {
    textToCopy: string
    setTextToCopy: React.Dispatch<React.SetStateAction<string>>
    copyToClipboard: (text: string) => Promise<void>
    isCopied: boolean
    setIsCopied: React.Dispatch<React.SetStateAction<boolean>>
}

export const useClipboard = (): UseClipboardReturnType => {
    const [textToCopy, setTextToCopy] = useState<string>('')
    const [isCopied, setIsCopied] = useState<boolean>(false)

    const copyToClipboard = async (text: string): Promise<void> => {
        if (!navigator.clipboard) {
            const textArea = document.createElement('textarea')
            textArea.value = text
            document.body.appendChild(textArea)
            textArea.select()
            try {
                document.execCommand('copy')
                setIsCopied(true)
            } catch (err) {
                console.error('Copy failed:', err)
                setIsCopied(false)
            }
            document.body.removeChild(textArea)
        } else {
            try {
                await navigator.clipboard.writeText(text)
                setIsCopied(true)
            } catch (err) {
                setIsCopied(false)
            }
        }
    }

    useEffect(() => {
        if (textToCopy && isCopied) {
            const timeoutId = setTimeout(() => {
                setIsCopied(false)
            }, 2000)
            return () => clearTimeout(timeoutId)
        }
    }, [textToCopy, isCopied])

    return {
        textToCopy,
        setTextToCopy,
        copyToClipboard,
        isCopied,
        setIsCopied
    }
}

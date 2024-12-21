'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ThemeColor } from '@/utils/enum'
import { Icon } from '@/components/ui/icon'
import { useConfigStore } from '@/stores/config'
import { useEffect } from 'react'

interface ThemeIconProps {
    className?: string
    iconClassName?: string
}

export const ThemeIcon = ({ className, iconClassName }: ThemeIconProps) => {
    const theme = useConfigStore((state) => state.theme)
    const isDark = useConfigStore((state) => state.isDark)
    const toggleTheme = useConfigStore((state) => state.toggleTheme)

    useEffect(() => {
        document?.startViewTransition(() => {
            document.documentElement.classList.toggle('dark', isDark)
        })

        if (!document?.startViewTransition) {
            document.documentElement.classList.toggle('dark', isDark)
        }
    }, [isDark])

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className={className}>
            <Icon className={cn('size-5', iconClassName)} name={isDark ? 'Moon' : 'Sun'} />
        </Button>
    )
}

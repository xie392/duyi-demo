'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { useConfigStore } from '@/stores/config'
import { useEffect } from 'react'

interface ThemeIconProps {
    className?: string
    iconClassName?: string
}

export const ThemeIcon = ({ className, iconClassName }: ThemeIconProps) => {
    const isDark = useConfigStore((state) => state.isDark)
    const toggleTheme = useConfigStore((state) => state.toggleTheme)

    useEffect(() => {
        const performToggle = () => {
            document.documentElement.classList.toggle('dark', isDark)
        }

        if (document?.startViewTransition) {
            document.startViewTransition(performToggle)
            return
        }
        
        performToggle()
    }, [isDark])

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className={className}>
            <Icon className={cn('size-5', iconClassName)} name={isDark ? 'Moon' : 'Sun'} />
        </Button>
    )
}

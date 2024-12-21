'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export const Affix = () => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <Button
            className="fixed bottom-16 right-10 z-50 shadow-xl bg-background rounded-full size-12"
            variant="ghost"
            size="icon"
            onClick={handleClick}
        >
            <Icon name="ArrowUp" className="size-10" />
        </Button>
    )
}

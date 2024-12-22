import { cn } from '@/lib/utils'

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export const Flex = ({ children, className = '', ...props }: FlexProps) => (
    <div className={cn('flex items-center gap-x-2', className)} {...props}>
        {children}
    </div>
)

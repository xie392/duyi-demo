import { cn } from '@/lib/utils'
import { MDXComponentProps } from '@/types/mdx'

const BASE_CLASS = 'text-gray-800 dark:text-gray-100 font-bold'

export const H1 = ({ children }: Readonly<MDXComponentProps>) => <h1 className={cn(BASE_CLASS, 'text-4xl')}>{children}</h1>
export const H2 = ({ children }: MDXComponentProps) => <h2 className={cn(BASE_CLASS, 'text-3xl')}>{children}</h2>
export const H3 = ({ children }: MDXComponentProps) => <h3 className={cn(BASE_CLASS, 'text-2xl')}>{children}</h3>
export const H4 = ({ children }: MDXComponentProps) => <h4 className={cn(BASE_CLASS, 'text-xl')}>{children}</h4>
export const H5 = ({ children }: MDXComponentProps) => <h5 className={cn(BASE_CLASS, 'text-lg')}>{children}</h5>
export const H6 = ({ children }: MDXComponentProps) => <h6 className={cn(BASE_CLASS, 'text-base')}>{children}</h6>

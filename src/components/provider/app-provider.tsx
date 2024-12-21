'use client'

import { AppContext } from '@/context/app-context'
import { MDXRoutes, MenuItem } from '@/types/mdx'

interface AppProviderProps {
    menus: MenuItem[]
    routes: MDXRoutes[]
    children: React.ReactNode
}

export const AppProvider = ({ children, menus, routes, }: AppProviderProps) => {
    return (
        <AppContext.Provider value={{ menus, routes }}>
            {children}
        </AppContext.Provider>
    )
}

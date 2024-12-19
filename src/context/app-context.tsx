'use client'
import { MDXRoutes, MenuItem } from '@/types/mdx'
import { createContext } from 'react'

export interface AppState {
    menus: MenuItem[]
    routes: MDXRoutes[]
}

export const appState: AppState = {
    menus: [],
    routes: []
}


export interface AppContextData extends AppState { }

export const AppContext = createContext<AppContextData>(appState)

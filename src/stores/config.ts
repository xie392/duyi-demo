import { createPersistStore } from '@/utils/store'
import { MDXRoutes, MenuItem } from '@/types/mdx'
import { create } from 'zustand'

interface ConfigState {
    navMain: MenuItem[]
    routes: MDXRoutes[]
}

interface ConfigActions {
    update: (state: Partial<ConfigState>) => void
}


// export const useConfigStore = create<ConfigState & ConfigActions>((set) => {
//     const initialState: ConfigState = {
//         navMain: [],
//         routes: []
//     }

//     const actions: ConfigActions = {
//         update: (state) => set((prev) => ({ ...prev, ...state }))
//     }

//     return {
//         ...initialState,
//         ...actions
//     }
// }
// )


export const useConfigStore = createPersistStore<ConfigState>(
    {
        navMain: [],
        routes: []
    },
    (set) => ({

    }),
    {
        name: 'config',
        version: 1
    }
)

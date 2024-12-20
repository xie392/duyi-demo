import { createPersistStore } from '@/utils/store'
// import { MDXRoutes, MenuItem } from '@/types/mdx'
// import { persist } from 'zustand/middleware'

interface ConfigState {
    openKeys: string[]
}

// interface ConfigActions {
//     update: (state: Partial<ConfigState>) => void
// }

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
        openKeys: []
    },
    () => ({}),
    {
        name: 'config',
        version: 1,
        // TODO: 存到 sessionStorage
        // storage: persist
    }   
)

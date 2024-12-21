import { create } from 'zustand'

interface ConfigState {
    openKeys: string[]
}

interface ConfigActions {
    update: (state: Partial<ConfigState>) => void
}

export const useMenusStore = create<ConfigState & ConfigActions>((set) => {
    const initialState: ConfigState = {
        openKeys: []
    }

    const actions: ConfigActions = {
        update: (state) => set((prev) => ({ ...prev, ...state }))
    }

    return {
        ...initialState,
        ...actions
    }
})

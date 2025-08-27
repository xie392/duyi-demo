import { createPersistStore } from '@/utils/store'

interface SidebarState {
    openKeys: string[]
}

export const useSidebarStore = createPersistStore<SidebarState>(
    {
        openKeys: []
    },
    (set, get) => ({
        setOpenKeys: (keys: string[]) => {
            set({ openKeys: keys })
        },
        toggleKey: (key: string) => {
            const { openKeys } = get()
            const newOpenKeys = openKeys.includes(key) 
                ? openKeys.filter((k) => k !== key) 
                : [...openKeys, key]
            set({ openKeys: newOpenKeys })
        },
        addKey: (key: string) => {
            const { openKeys } = get()
            if (!openKeys.includes(key)) {
                set({ openKeys: [...openKeys, key] })
            }
        },
        removeKey: (key: string) => {
            const { openKeys } = get()
            set({ openKeys: openKeys.filter((k) => k !== key) })
        }
    }),
    {
        name: 'sidebar-state',
        version: 1
    }
)
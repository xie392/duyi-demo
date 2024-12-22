import { ThemeColor } from '@/utils/enum'
import { createPersistStore } from '@/utils/store'
interface ConfigState {
    theme: ThemeColor
    isDark: boolean
}

export const useConfigStore = createPersistStore<ConfigState>(
    {
        theme: ThemeColor.Light,
        isDark: false
    },
    (set, get) => ({
        toggleTheme: () => {
            const { isDark } = get()
            const theme = isDark? ThemeColor.Light : ThemeColor.Dark
            set({ theme, isDark: !isDark })
        }
    }),
    {
        name: 'config',
        version: 1
    }
)

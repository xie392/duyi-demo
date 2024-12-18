import { createPersistStore } from '@/utils/store'

export const useCountStore = createPersistStore(
    {
        count: 0
    },
    (set) => ({
        increment: () => set((state) => ({ count: state.count + 1 }))
    }),
    {
        name: 'counter',
        version: 1
    }
)

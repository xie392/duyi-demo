import { createPersistStore } from '@/utils/store'

export const useUserStore = createPersistStore(
    {
        token: ''
    },
    () => {},
    {
        name: 'user',
        version: 1
    }
)

import { create } from 'zustand'
import { combine, persist } from 'zustand/middleware'

type Updater<T> = (arg: Partial<T>) => void

type SecondParam<T> = T extends (_f: infer _F, _s: infer S, ...args: infer _U) => any ? S : never

export type MakeUpdater<T> = {
    lastUpdateTime: number
    update: Updater<T>
}

export type SetStoreState<T> = (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean | undefined
) => void

export function createPersistStore<T extends object, M>(
    state: T,
    methods: (set: SetStoreState<T & MakeUpdater<T>>, get: () => T & MakeUpdater<T>) => M,
    persistOptions: SecondParam<typeof persist<T & M & MakeUpdater<T>>>
) {
    return create(
        persist(
            combine(
                {
                    ...state,
                    lastUpdateTime: 0
                },
                (set, get) => {
                    return {
                        ...methods(set as SetStoreState<T & MakeUpdater<T>>, get as () => T & MakeUpdater<T>),
                        update(options) {
                            set((state) => ({
                                ...state,
                                ...options,
                                lastUpdateTime: Date.now()
                            }))
                        }
                    } as M & MakeUpdater<T>
                }
            ),
            persistOptions as any
        )
    )
}

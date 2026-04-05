import { create } from 'zustand'

type CounterState = {
    count: number
    increment: () => void
    decrement: () => void
    reset: () => void
    get: () => number
}

export const useCounter = create<CounterState>((set, get) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
    get: () => get().count,
}));

// to use :
// const { count , increment , decrement , get } = useCounter();

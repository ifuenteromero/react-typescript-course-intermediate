import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

interface CounterStore {
	value: number;
	increment: () => void;
	reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
	value: 0,
	increment: () => set((store) => ({ value: store.value + 1 })),
	reset: () => set(() => ({ value: 0 })),
}));

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('Counter store', useCounterStore);
}

export default useCounterStore;

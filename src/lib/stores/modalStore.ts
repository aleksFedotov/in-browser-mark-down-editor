import { writable } from 'svelte/store';

const createModalStore = () => {
	const { subscribe, update, set } = writable(false);

	return {
		subscribe,
		set,
		update,
		toggleModal: () => update((state) => !state),
		setState: (modalState: boolean) => set(modalState)
	};
};

export const modalStore = createModalStore();

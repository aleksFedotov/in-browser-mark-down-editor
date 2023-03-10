import { writable } from 'svelte/store';

const createSideBarStore = () => {
	const { subscribe, update, set } = writable(false);

	return {
		subscribe,
		set,
		update,

		toggleSideBar: () => update((state) => !state)
	};
};

export const sideBarStore = createSideBarStore();

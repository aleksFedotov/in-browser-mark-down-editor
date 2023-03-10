import { writable } from 'svelte/store';

export interface IMarkDownForm {
	name: string;
	content: string;
}

const createFormStore = () => {
	const { subscribe, update, set } = writable<IMarkDownForm>({
		name: '',
		content: ''
	});

	return {
		subscribe,
		set,
		update,
		updateContent: (content: string) =>
			update((state) => {
				return {
					...state,
					content
				};
			}),
		updateName: (name: string) =>
			update((state) => {
				return {
					...state,
					name
				};
			})
	};
};

const formStore = createFormStore();

export default formStore;

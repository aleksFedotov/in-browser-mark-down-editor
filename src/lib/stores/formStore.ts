import { writable } from 'svelte/store';

export interface IMarkDownForm {
	name: string;
	content: string;
}

const formStore = writable<IMarkDownForm>({
	name: '',
	content: ''
});

export default formStore;

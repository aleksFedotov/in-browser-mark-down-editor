import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let theme: string;

if (browser) {
	const storedTheme = window.localStorage.getItem('theme');
	theme = storedTheme ? storedTheme : 'dark';
} else {
	theme = 'dark';
}

const isDarkMode: boolean = theme === 'dark' ? true : false;

const createThemeStore = () => {
	const { subscribe, update, set } = writable(isDarkMode);

	return {
		subscribe,
		set,
		update,
		toggleTheme: () =>
			update((state) => {
				if (browser) {
					document.documentElement.setAttribute('data-theme', !state ? 'dark' : 'light');
				}
				return !state;
			}),
		setTheme: (newState: boolean) => set(newState)
	};
};

const themeStore = createThemeStore();

themeStore.subscribe((state) => {
	if (browser) localStorage.setItem('theme', state ? 'dark' : 'light');
});

export default themeStore;

import { get } from 'svelte/store';
import themeStore from '../themeStore';

describe('themeStore testing', () => {
	test('should have initial data', async () => {
		const theme = get(themeStore);

		expect(theme).toBe(true);
	});

	test('should toggle theme', () => {
		const prevTheme = get(themeStore);
		expect(prevTheme).toBe(true);
		themeStore.toggleTheme();
		const currTheme = get(themeStore);
		expect(currTheme).toBe(false);
	});
	test('should set theme', () => {
		const prevTheme = get(themeStore);
		expect(prevTheme).toBe(false);
		themeStore.setTheme(true);
		const currTheme = get(themeStore);
		expect(currTheme).toBe(true);
	});
});

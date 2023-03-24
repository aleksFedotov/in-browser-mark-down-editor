import { get } from 'svelte/store';
import themeStore from '../themeStore';

describe('themeStore testing', () => {
	test('should have initial data', async () => {
		const theme = get(themeStore);

		expect(theme).toBe('dark');
	});

	test('should toggle theme', () => {
		const prevTheme = get(themeStore);
		expect(prevTheme).toBe('dark');
		themeStore.toggleTheme();
		const currTheme = get(themeStore);
		expect(currTheme).toBe('light');
	});
	test('should set theme', () => {
		const prevTheme = get(themeStore);
		expect(prevTheme).toBe('light');
		themeStore.setTheme('dark');
		const currTheme = get(themeStore);
		expect(currTheme).toBe('dark');
	});
});

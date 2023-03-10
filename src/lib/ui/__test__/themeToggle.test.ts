import ThemeToggle from '../ThemeToggle.svelte';
import { screen, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

describe('ThemeTogal component testing', () => {
	test('should render component', () => {
		render(ThemeToggle);
		const toggle = screen.getByTestId('toggle');
		expect(toggle).toBeDefined();
	});

	test('should initialy be dark mode', () => {
		render(ThemeToggle);
		const toggle = screen.getByTestId('toggle');
		const toggleDark = screen.getByTestId('toggle_dark');
		expect(toggle.classList[2]).toBe('dark');
		expect(toggleDark.classList[3]).toBe('selected');
	});
	test('should cahnge to light mode after user click', async () => {
		const user = userEvent.setup();
		render(ThemeToggle);
		const toggle = screen.getByTestId('toggle');
		await user.click(toggle);

		const toggleLight = screen.getByTestId('toggle_light');
		expect(toggle.classList[2]).toBe('light');

		expect(toggleLight.classList[3]).toBe('selected');
	});
});

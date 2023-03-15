import Header from '../Header.svelte';
import { screen, render } from '@testing-library/svelte';

describe('Header component testing', () => {
	test('should render component', () => {
		render(Header);
		const header = screen.getByRole('banner');
		expect(header).toBeInTheDocument();
	});

	test('should be able to save changes');
});

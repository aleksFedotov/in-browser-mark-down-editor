import Header from '../Header.svelte';
import { screen, render, getByRole } from '@testing-library/svelte';

describe('Header component testing', () => {
	test('should render component', () => {
		render(Header);
		const header = screen.getByRole('banner');
		expect(header).toBeInTheDocument();
	});

	// test('should click save btn', () => {
	//    render(Header)
	//     const onClick = vi.fn()
	//     const saveBtn = screen.getByRole('button', {name: /save/i})
	//     saveBtn.component.$on('clikc', )

	// })
});

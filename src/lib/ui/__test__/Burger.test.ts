import Burger from '../Burger.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Bureger componnet tessting', () => {
	test('should render component', () => {
		render(Burger);

		const burger = screen.getByTestId('burger');

		expect(burger).to.not.null;
	});

	test('should have burger class initially', () => {
		render(Burger);

		const burger = screen.getByTestId('burger');

		expect(burger.classList[0]).toBe('burger');
	});
	test('should be able to click on burger and change class to burger close', async () => {
		const user = userEvent.setup();
		render(Burger);

		const burger = screen.getByTestId('burger');

		await user.click(burger);

		expect(burger.classList[1]).toBe('close');
	});
});

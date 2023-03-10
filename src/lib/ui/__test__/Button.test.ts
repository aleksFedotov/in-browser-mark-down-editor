import Button from '../Button.svelte';
import { render, screen } from '@testing-library/svelte';
describe('Button Component', () => {
	test('should render component', () => {
		render(Button, { type: 'default' });
		const btn = screen.getByRole('button');
		expect(btn).toBeDefined();
	});
	test('should not have class if it is default button', () => {
		render(Button, { type: 'default' });
		const btn = screen.getByRole('button');

		expect(btn.classList[0]).toBe('default');
	});
	test('should  have save class if it is default button', () => {
		render(Button, { type: 'save' });
		const btn = screen.getByRole('button');

		expect(btn.classList[0]).toBe('save_btn');
	});
});

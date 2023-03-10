import Modal from '../Modal.svelte';
import { screen, render } from '@testing-library/svelte';

describe('Modal component testing', () => {
	test('should render component', () => {
		render(Modal);

		const content = screen.getByText('Delete this document?');
		expect(content).toBeDefined();
	});

	test('should have right text content , convirm button and close button', () => {
		render(Modal);
		const text = screen.getByText(
			'Are you sure you want to delete ‘welcome.md’ document and its contents? This action cannot be reversed.'
		);
		const convimBtn = screen.getByRole('button', {
			name: /Confirm & Delete/i
		});
		const closeBtn = screen.getByRole('button', {
			name: /close/i
		});

		expect(text).toBeDefined();
		expect(convimBtn).toBeDefined();
		expect(closeBtn).toBeDefined();
	});
});

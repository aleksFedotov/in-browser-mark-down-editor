import DocumentInfo from '../DocumentInfo.svelte';
import { render, screen } from '@testing-library/svelte';

describe('DocumnetInfo component testing', () => {
	test('should render component', () => {
		render(DocumentInfo, {
			date: '14-04-2023',
			fileName: 'untitled',
			markdownId: '123'
		});
		const docInfo = screen.getByText(/14-04-2023/);
		expect(docInfo).toBeDefined();
	});

	test('should have right info', () => {
		render(DocumentInfo, {
			date: '14-04-2023',
			fileName: 'untitled',
			markdownId: '123'
		});
		const date = screen.getByText(/14-04-2023/);
		expect(date).toBeDefined();
		const name = screen.getByText(/untitled/);
		expect(name).toBeDefined();
	});
});

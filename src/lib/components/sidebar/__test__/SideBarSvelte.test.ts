import SideBar from '../SideBar.svelte';
import { render, screen } from '@testing-library/svelte';
import markdownStore from '$lib/stores/markdowmsStore';

import type { IMarkDownStore } from '$lib/stores/markdowmsStore';

const store: IMarkDownStore = {
	markdownsData: [
		{
			createdAt: '04-01-2022',
			name: 'test-name',
			content: 'Test',
			id: '1'
		},
		{
			createdAt: '04-01-2022',
			name: 'test-name1',
			content: 'Test1',
			id: '2'
		}
	],
	currentMarkDown: '1'
};

describe('SideBar component testing', () => {
	test('Should render component', () => {
		render(SideBar);
		const sidebar = screen.getByRole('region');
		expect(sidebar).toBeInTheDocument();
	});

	test('should have right amount of docs', () => {
		markdownStore.set(store);
		render(SideBar);
		const docs = screen.getAllByTestId('document_info');
		expect(docs).toHaveLength(2);
	});
});

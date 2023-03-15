import DocumentName from '../DocumentName.svelte';
import { render, screen } from '@testing-library/svelte';

import markdownStore, { type IMarkDownStore } from '$lib/stores/markdowmsStore';

const store: IMarkDownStore = {
	markdownsData: [
		{
			createdAt: '04-01-2022',
			name: 'test-name',
			content: 'Test',
			id: '1'
		}
	],
	currentMarkDown: '1'
};

const emptyStore: IMarkDownStore = {
	markdownsData: [],
	currentMarkDown: ''
};

describe('DocumentName component testing', () => {
	test('should render component', () => {
		render(DocumentName);
		const input = screen.getByTestId('document_name');
		expect(input).toBeInTheDocument();
	});

	test('should have label if screen width > 640', () => {
		render(DocumentName);
		const label = screen.getByTestId('document_name_label');
		expect(label).toBeInTheDocument();
	});

	test('should not have label if screen width < 640', () => {
		global.innerWidth = 630;
		global.dispatchEvent(new Event('resize'));
		render(DocumentName);
		const label = screen.queryByTestId('document_name_label');
		expect(label).not.toBeInTheDocument();
	});
	test('should get name from store if store is not empty', () => {
		markdownStore.set(store);
		render(DocumentName);
		const input = screen.getByTestId('document_name');
		expect(input).toHaveValue('test-name');
	});
	test('should get default name  if store is  empty', () => {
		markdownStore.set(emptyStore);
		render(DocumentName);
		const input = screen.getByTestId('document_name');
		expect(input).toHaveValue('untitled-document.md');
	});
});

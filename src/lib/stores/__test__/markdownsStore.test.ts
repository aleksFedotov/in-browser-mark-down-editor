import markdownStore from '../markdowmsStore';
import type { IMarkDownStore } from '../markdowmsStore';
import { get } from 'svelte/store';

const emptyStore: IMarkDownStore = {
	markdownsData: [],
	currentMarkDown: ''
};

describe('markdownStore testing', () => {
	test('should have iniital data', () => {
		const { markdownsData, currentMarkDown } = get(markdownStore);
		expect(markdownsData).toHaveLength(2);
		expect(currentMarkDown).toBe('0aaa1652-a9b6-4d9b-96ef-5f89d39ff75e');
	});

	test('should be able to save changes document', () => {
		markdownStore.saveMarkDwon('test-name', 'test-content');
		const { markdownsData } = get(markdownStore);
		const lastDoc = markdownsData[markdownsData.length - 1];
		expect(lastDoc.content).toBe('test-content');
		expect(lastDoc.name).toBe('test-name');
	});
	test('should be able to add new document with right name', () => {
		markdownStore.createNewDocument();
		const { markdownsData } = get(markdownStore);
		expect(markdownsData).toHaveLength(3);
		const lastDoc = markdownsData[markdownsData.length - 1];
		expect(lastDoc.name).toBe('untitled-document(1).md');
	});

	test('should be able to delete document', () => {
		let markdownsData = get(markdownStore).markdownsData;
		expect(markdownsData).toHaveLength(3);
		markdownStore.deleteMarkDown();
		markdownsData = get(markdownStore).markdownsData;

		expect(markdownsData).toHaveLength(2);
	});

	test('should change currentMarkdown after user selected', () => {
		const markdownsData = get(markdownStore).markdownsData;
		const idOfFirstDoc = markdownsData[0].id;
		markdownStore.selectMarkDown(idOfFirstDoc);
		const currentMarkDown = get(markdownStore).currentMarkDown;
		expect(currentMarkDown).toBe(idOfFirstDoc);
	});
	test('shoild change currentMark to empty string after deletion of last doc', () => {
		markdownStore.deleteMarkDown();
		markdownStore.deleteMarkDown();
		const currentMarkDown = get(markdownStore).currentMarkDown;
		expect(currentMarkDown).toBe('');
	});

	test('should creat a new document after save if there are no docs', () => {
		markdownStore.set(emptyStore);
		let markdownsData = get(markdownStore).markdownsData;
		expect(markdownsData).toHaveLength(0);
		markdownStore.saveMarkDwon('test-name', 'test-content');
		markdownsData = get(markdownStore).markdownsData;
		expect(markdownsData).toHaveLength(1);
		const lastDoc = markdownsData[markdownsData.length - 1];
		expect(lastDoc.content).toBe('test-content');
		expect(lastDoc.name).toBe('test-name');
	});
});

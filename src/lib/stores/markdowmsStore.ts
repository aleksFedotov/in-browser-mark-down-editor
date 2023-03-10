import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

export interface IMarkDownData {
	createdAt: string;
	name: string;
	content: string;
	id: string;
}

export interface IMarkDownStore {
	markdownsData: IMarkDownData[];
	currentMarkDown: string;
}

const initialData: IMarkDownStore = {
	markdownsData: [
		{
			createdAt: '04-01-2022',
			name: 'untitled-document.md',
			content: '',
			id: '942b9df8-f17a-4c77-a6be-2eda2f6a8f47'
		},
		{
			createdAt: '04-01-2022',
			name: 'welcome.md',
			content:
				"# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
			id: '0aaa1652-a9b6-4d9b-96ef-5f89d39ff75e'
		}
	],
	currentMarkDown: '0aaa1652-a9b6-4d9b-96ef-5f89d39ff75e'
};

let initialState: IMarkDownStore;
if (browser) {
	const storedData = window.localStorage.getItem('markdownData');
	initialState = storedData ? JSON.parse(storedData) : initialData;
} else {
	initialState = initialData;
}

const createMarkdownStore = () => {
	const { subscribe, set, update } = writable<IMarkDownStore>(initialState);

	return {
		subscribe,
		set,
		update,
		saveMarkDwon: (currentMarkdownName: string, currentMardownContent: string) =>
			update((state) => {
				const { markdownsData, currentMarkDown } = state;

				if (currentMarkDown === '') {
					const id = uuidv4();
					const date = format(new Date(), 'MM-dd-yyyy');
					const newMarkDown: IMarkDownData = {
						createdAt: date,
						name: currentMarkdownName,
						content: currentMardownContent,
						id
					};
					return {
						markdownsData: [newMarkDown],
						currentMarkDown: id
					};
				}
				const copiedMarkDownData = [...markdownsData];
				const markDownToUpdate = copiedMarkDownData.find(
					(markdown) => markdown.id === currentMarkDown
				);
				if (markDownToUpdate) {
					markDownToUpdate.content = currentMardownContent;
					markDownToUpdate.name = currentMarkdownName;
				}

				return {
					...state,
					markdownsData: copiedMarkDownData
				};
			}),
		deleteMarkDown: () =>
			update((state) => {
				const filteredMarkdowns = state.markdownsData.filter(
					(markdown) => markdown.id !== state.currentMarkDown
				);
				let newCurerntMarkdowm;
				if (filteredMarkdowns.length) {
					newCurerntMarkdowm = filteredMarkdowns[filteredMarkdowns.length - 1].id;
				} else {
					newCurerntMarkdowm = '';
				}
				return {
					markdownsData: filteredMarkdowns,
					currentMarkDown: newCurerntMarkdowm
				};
			}),

		createNewDocument: () =>
			update((state) => {
				const id = uuidv4();
				const date = format(new Date(), 'MM-dd-yyyy');
				let name = 'untitled-document.md';
				const count = state.markdownsData.filter((markdown) =>
					markdown.name.includes('untitled')
				).length;
				if (count > 0) name = `untitled-document(${count}).md`;
				const newDoc: IMarkDownData = {
					createdAt: date,
					name,
					content: '',
					id
				};

				return {
					markdownsData: [...state.markdownsData, newDoc],
					currentMarkDown: id
				};
			}),

		selectMarkDown: (markdownId: string) =>
			update((state) => {
				return { ...state, currentMarkDown: markdownId };
			})
	};
};

const markdownStore = createMarkdownStore();

markdownStore.subscribe((state) => {
	if (browser) {
		localStorage.setItem('markdownData', JSON.stringify(state));
	}
});

export default markdownStore;

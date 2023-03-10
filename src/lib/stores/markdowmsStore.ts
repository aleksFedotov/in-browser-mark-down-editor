import { writable } from 'svelte/store';
import { browser } from '$app/environment';

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

const markdownStore = writable<IMarkDownStore>(initialState);

markdownStore.subscribe((state) => {
	if (browser) {
		localStorage.setItem('markdownData', JSON.stringify(state));
	}
});

export default markdownStore;

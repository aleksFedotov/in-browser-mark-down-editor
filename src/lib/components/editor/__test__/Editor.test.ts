import Editor from '../Editor.svelte';
import { screen, render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

const initialText =
	"# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```";

describe('Edtior componet testing', () => {
	test('should redner component', () => {
		render(Editor);

		const markdown = screen.getByRole('heading', { level: 3, name: /Markdown/i });
		const preview = screen.getByRole('heading', { level: 3, name: /preview/i });

		expect(markdown).toBeInTheDocument();
		expect(preview).toBeInTheDocument();
	});

	test('should hide preview initially on mobile', async () => {
		global.innerWidth = 500;
		global.dispatchEvent(new Event('resize'));
		render(Editor);

		const preview = screen.getByTestId('preview');

		expect(preview.classList[2]).toBe('hide');
	});

	test('should hide markdown editor after clicking on btn', async () => {
		global.innerWidth = 500;
		global.dispatchEvent(new Event('resize'));
		const user = userEvent.setup();
		render(Editor);
		const icon = screen.getByTestId('preview_icon');
		await user.click(icon);
		const markdown = screen.getByTestId(/markdown/i);
		expect(markdown.classList[2]).toBe('hide');
	});

	test('markdown textarea should have initial text', () => {
		render(Editor);
		const textArea = screen.getByRole('textbox');
		expect(textArea).toHaveValue(initialText);
	});

	test('editor  should have initial markdowned text', () => {
		render(Editor);
		const h1 = screen.getByRole('heading', { level: 1, name: /Welcome to Markdown/i });
		const h2 = screen.getByRole('heading', { level: 2, name: /How to use this?/i });
		const h3 = screen.getByRole('heading', { level: 3, name: /Features/i });
		const h4 = screen.getByRole('heading', { level: 4, name: /Headings/i });
		const h5 = screen.getByRole('heading', { level: 5, name: /Lists/i });
		const h6 = screen.getByRole('heading', { level: 6, name: /Code Blocks/i });

		expect(h1).toBeInTheDocument();
		expect(h2).toBeInTheDocument();
		expect(h3).toBeInTheDocument();
		expect(h4).toBeInTheDocument();
		expect(h5).toBeInTheDocument();
		expect(h6).toBeInTheDocument();
	});

	// test('markdown textarea should be able to change value after typing', async () => {
	// 	const user = userEvent.setup();
	// 	render(Editor);
	// 	// const textArea = screen.getByRole('textbox');

	// 	await user.type(screen.getByRole('textbox'), '# Frontend Mentor');

	// 	// const textAreaNew = screen.getByRole('textbox');

	// 	expect(screen.getByRole('textbox')).toHaveValue('# Frontend Mentor');
	// });
});

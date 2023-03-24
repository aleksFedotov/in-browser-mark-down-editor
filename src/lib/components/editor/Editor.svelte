<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { tweened } from 'svelte/motion';
	import { fade, fly, slide } from 'svelte/transition';
	import markdownStore from '$lib/stores/markdowmsStore';
	import formStore from '$lib/stores/formStore';
	import { onDestroy, onMount } from 'svelte';
	import PreviewIconOpen from '$lib/ui/PreviewIconOpen.svelte';
	import PreviewIconClose from '$lib/ui/PreviewIconClose.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';

	let markdown: string = '';
	let isLoading = true;
	let firstLoad = true;
	let isPreviewOpened = false;
	let innerWidth: number;
	let markdowwnWidth = 50;
	let reviewWidth = 50;
	// let tweenedMarkdowwnWidth = tweened(50);
	// let tweenedReviewWidth = tweened(50);

	const unsubMarkdownstore = markdownStore.subscribe((state) => {
		const currentMarkdowm =
			state.markdownsData.find((markdown) => markdown.id === state.currentMarkDown)?.content || '';
		markdown = currentMarkdowm;
	});

	// $: markdowwnWidth = isPreviewOpened && innerWidth > 640 ? 0 : 50;
	// $: reviewWidth = isPreviewOpened && innerWidth > 640 ? 100 : 50;

	// $: tweenedMarkdowwnWidth.set(markdowwnWidth);
	// $: tweenedReviewWidth.set(reviewWidth);

	$: formStore.updateContent(markdown);

	onMount(() => {
		isLoading = false;
		firstLoad = false;
	});

	onDestroy(() => {
		unsubMarkdownstore();
	});
</script>

<svelte:window bind:innerWidth />

<section class="editor">
	<div
		class="editor_markdown"
		data-testid="markdown"
		class:markdown_close={isPreviewOpened}
		class:markdown_open={!isPreviewOpened}
	>
		<!-- <div
		class="editor_markdown"
		style={`width: ${$tweenedMarkdowwnWidth}%`}
		class:hide={innerWidth < 640 && isPreviewOpened}
		data-testid="markdown"
	> -->
		<div class="editor_header">
			<h3 class="heading_s">Markdown</h3>
			<div
				on:click={() => {
					isPreviewOpened = !isPreviewOpened;
				}}
				on:keydown={() => {}}
				data-testid="preview_icon"
			>
				{#if !isPreviewOpened && innerWidth < 640}
					<PreviewIconOpen />
				{/if}
			</div>
		</div>
		<!-- {#if !isPreviewOpened && innerWidth > 640}
		 -->
		{#if isLoading}
			<div class="editor_markdown_wrapper" class:loading={isLoading}>
				<Spinner />
				<!-- {:else if !isPreviewOpened && innerWidth > 640} -->
			</div>
		{:else}
			<textarea
				class="editor_markdown_textarea"
				bind:value={markdown}
				data-testid="markdown-textarea"
			/>
			<!-- {:else if !isPreviewOpened && innerWidth < 640} -->
			<!-- <textarea
					class="editor_markdown_textarea"
					bind:value={markdown}
					data-testid="markdown-textarea"
				/> -->
		{/if}

		<!-- {:else if !isPreviewOpened && innerWidth < 640}
			<textarea
				class="editor_markdown_textarea"
				bind:value={markdown}
				data-testid="markdown-textarea"
			/>
		{/if} -->

		<!-- <textarea
			in:fade
			class="editor_markdown_textarea"
			bind:value={markdown}
			data-testid="markdown-textarea"
		/> -->
	</div>

	<div
		class="editor_preview"
		data-testid="preview"
		class:preview_open={isPreviewOpened}
		class:preview_close={!isPreviewOpened}
	>
		<!-- <div
		class="editor_preview"
		style={`width: ${$tweenedReviewWidth}%;`}
		class:hide={innerWidth < 640 && !isPreviewOpened}
		data-testid="preview"
	> -->
		<div class="editor_header">
			<h3 class="heading_s">Preview</h3>
			<div
				on:click={() => {
					isPreviewOpened = !isPreviewOpened;
				}}
				on:keydown={() => {}}
			>
				{#if !isPreviewOpened}
					<PreviewIconOpen />
				{:else}
					<PreviewIconClose />
				{/if}
			</div>
		</div>
		<div class="editor_preview_result" class:loading={isLoading}>
			{#if isLoading}
				<Spinner />
			{:else}
				<SvelteMarkdown source={markdown} />
			{/if}
		</div>
	</div>
</section>

<style>
	.editor {
		display: flex;
		height: 100vh;
	}

	.editor_markdown {
		border-right: 1px solid var(--color-border);
	}

	.editor_preview,
	.editor_markdown {
		background: var(--color-bg);
		/* transition: width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); */
	}

	.editor_markdown_textarea,
	.editor_preview_result,
	.editor_markdown_wrapper {
		align-items: center;
		padding: 20px 20px 55px;
		overflow-y: hidden;

		height: 100%;
	}

	.preview_close {
		width: 50%;
	}

	.preview_open {
		width: 100%;
	}

	.markdown_close {
		width: 0%;
	}

	.markdown_open {
		width: 50%;
	}

	.editor_markdown_textarea {
		border: none;
		width: 100%;
		color: var(--color-markdown-text);
		font-size: 1.4rem;
		font-style: normal;
		line-height: 2.4rem;
		background-color: transparent;
	}

	.editor_markdown_textarea:focus {
		outline: none;
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.editor_header {
		display: flex;
		padding: 1.4rem 1.6rem;
		background-color: var(--color-editor-header-bg);
		color: var(--color-editor-header-text);
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/* .hiden {
		transform: translate(50%);
	} */

	/* .hide {
		display: none;
	} */

	@media (max-width: 640px) {
		.editor_markdown,
		.editor_preview {
			width: 100% !important;
		}

		.preview_open {
			display: block;
		}

		.preview_close {
			display: none;
		}

		.markdown_open {
			display: block;
		}
		.markdown_close {
			display: none;
		}
	}
</style>

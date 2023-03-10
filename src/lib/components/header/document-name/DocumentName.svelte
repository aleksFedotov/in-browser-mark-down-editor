<script lang="ts">
	import DocIcon from '../../../../assets/icon-document.svg?component';
	import markdownStore from '$lib/stores/markdowmsStore';
	import formStore from '$lib/stores/formStore';
	import { onDestroy } from 'svelte';

	let currentDocName = 'untitled-document.md';

	const unsubMarkdown = markdownStore.subscribe((state) => {
		let currenMarkdown = state.markdownsData.find(
			(markdown) => markdown.id === state.currentMarkDown
		);
		currentDocName = currenMarkdown?.name || 'untitled-document.md';
	});

	$: formStore.update((state) => {
		return {
			...state,
			name: currentDocName
		};
	});

	let innerWidth = 1440;

	onDestroy(() => {
		unsubMarkdown();
	});
</script>

<svelte:window bind:innerWidth />

<div class="document_name_wrapper">
	<DocIcon width="16" />
	<div class="document_name">
		{#if innerWidth > 640}
			<label for="docName">Document Name</label>
		{/if}
		<input
			type="text"
			placeholder="Document Name"
			name="docName"
			bind:value={currentDocName}
			class="doc_input heading_m"
		/>
	</div>
</div>

<style>
	.document_name_wrapper {
		display: flex;
		gap: 1.6rem;
		align-items: center;
		padding-left: 2.4rem;

		flex-grow: 1;
	}

	.document_name {
		display: flex;
		flex-direction: column;
		gap: 2px;
		width: 100%;
		padding: 3px 0;
	}

	.document_name label {
		color: var(--color-500);
	}

	.doc_input {
		background-color: transparent;
		color: var(--color-100);
		border: none;
		font-weight: 400;
		cursor: pointer;

		max-width: 300px;
		width: 100%;
	}

	.document_name input:hover {
		box-shadow: 0 1px var(--color-100);
	}

	.doc_input:focus {
		outline: none;
		caret-color: var(--color-orange);
	}

	@media (max-width: 640px) {
		.document_name label {
			display: none;
		}
	}
</style>

<script lang="ts">
	import DocIcon from '../../../../assets/icon-document.svg?component';
	import markdownStore from '$lib/stores/markdowmsStore';
	import formStore from '$lib/stores/formStore';
	import { onDestroy, onMount } from 'svelte';
	let isLoading = true;
	let currentDocName = '';

	const unsubMarkdown = markdownStore.subscribe((state) => {
		let currenMarkdown = state.markdownsData.find(
			(markdown) => markdown.id === state.currentMarkDown
		);
		if (currenMarkdown) currentDocName = currenMarkdown.name;
		else currentDocName = 'untitled-document.md';
	});

	$: formStore.updateName(currentDocName);

	let innerWidth = 1440;

	onDestroy(() => {
		unsubMarkdown();
	});

	onMount(() => (isLoading = false));
</script>

<svelte:window bind:innerWidth />

<div class="document_name_wrapper">
	<DocIcon width="16" />
	<div class="document_name">
		{#if innerWidth > 640}
			<label for="docName" data-testid="document_name_label">Document Name</label>
		{/if}
		{#if !isLoading}
			<input
				type="text"
				name="docName"
				bind:value={currentDocName}
				class="doc_input heading_m"
				data-testid="document_name"
			/>
		{:else}
			<input
				type="text"
				name="docName"
				value={''}
				class="doc_input heading_m"
				data-testid="document_name"
			/>
		{/if}
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

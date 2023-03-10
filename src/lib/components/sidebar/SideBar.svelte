<script lang="ts">
	import { sideBarStore } from '$lib/stores/sideBarStore';
	import markdownStore from '$lib/stores/markdowmsStore';
	import ToogleTheme from '$lib/ui/ThemeToggle.svelte';
	import Logo from '$lib/ui/Logo.svelte';
	import Button from '$lib/ui/Button.svelte';
	import DocumentInfo from '$lib/ui/DocumentInfo.svelte';
	import { onDestroy } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { format } from 'date-fns';
	import type { IMarkDownData } from '$lib/stores/markdowmsStore';

	// let isSideBarOpened: boolean = false;
	let markdownData: IMarkDownData[] = [];

	const unsubmarkdowns = markdownStore.subscribe((state) => {
		markdownData = state.markdownsData;
	});

	const hadleNewDoc = () => {
		markdownStore.update((state) => {
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
				markdownsData: [...markdownData, newDoc],
				currentMarkDown: id
			};
		});
	};

	onDestroy(() => {
		unsubmarkdowns();
	});
</script>

<aside class="sidebar" class:opened={$sideBarStore}>
	<Logo isHeader={false} />

	<h2 class="heading_s sidebar_heading">my documents</h2>
	<Button on:click={hadleNewDoc}>+ New Document</Button>
	<ul class="documents_list">
		{#each markdownData as doc}
			<DocumentInfo date={doc.createdAt} fileName={doc.name} markdownId={doc.id} />
		{/each}
	</ul>
	<ToogleTheme />
</aside>

<style>
	.sidebar {
		height: 100vh;
		min-height: 100%;
		width: 25rem;
		background-color: var(--color-900);
		color: var(--color-100);
		padding: 2.4rem;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		transform: translateX(-25rem);
		transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.opened {
		transform: translateX(0);
	}

	.sidebar_heading {
		text-transform: uppercase;
		color: var(--color-500);
		margin-bottom: 3rem;
	}

	.documents_list {
		margin-top: 2.4rem;
		display: flex;
		flex-direction: column;
		gap: 2.4rem;
	}
</style>

<script lang="ts">
	import { sideBarStore } from '$lib/stores/sideBarStore';
	import markdownStore from '$lib/stores/markdowmsStore';
	import ToogleTheme from '$lib/ui/ThemeToggle.svelte';
	import Logo from '$lib/ui/Logo.svelte';
	import Button from '$lib/ui/Button.svelte';
	import DocumentInfo from '$lib/ui/DocumentInfo.svelte';
</script>

<aside class="sidebar" class:opened={$sideBarStore} role="region">
	<Logo isHeader={false} />

	<h2 class="heading_s sidebar_heading">my documents</h2>
	<Button on:click={markdownStore.createNewDocument}>+ New Document</Button>
	<ul class="documents_list">
		{#each $markdownStore.markdownsData as doc}
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

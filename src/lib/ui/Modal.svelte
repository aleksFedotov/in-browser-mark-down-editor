<script lang="ts">
	import Button from './Button.svelte';
	import { modalStore } from '$lib/stores/modalStore';
	import markdownStore from '$lib/stores/markdowmsStore';
	import { scale } from 'svelte/transition';

	const deleteHandler = () => {
		markdownStore.update((state) => {
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
		});
		modalStore.setState(false);
	};
</script>

<div class="modal_overlay" on:click|self={() => modalStore.setState(false)} on:keydown={() => {}}>
	<div class="modal" in:scale out:scale>
		<div class="modal_header">
			<h4>Delete this document?</h4>
			<button on:click={() => modalStore.setState(false)} aria-label="close">
				<span>&times;</span>
			</button>
		</div>
		<p>
			Are you sure you want to delete ‘welcome.md’ document and its contents? This action cannot be
			reversed.
		</p>
		<Button on:click={deleteHandler}>Confirm & Delete</Button>
	</div>
</div>

<style>
	.modal_overlay {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 10;
		background-color: rgba(21, 22, 25, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.6rem;
	}

	.modal {
		max-width: 34.3rem;
		width: 100%;
		z-index: 12;
		padding: 2.4rem;
		background-color: var(--color-modal-bg);
		border-radius: 0.4rem;
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
	}

	.modal_header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--color-modal-header);
	}

	p {
		font-family: 'Roboto Slab';
		font-style: normal;
		font-weight: 400;
		font-size: 1.4rem;
		line-height: 2.4rem;
		color: var(--color-modal-body);
	}

	button {
		font-size: 2.4rem;
		font-weight: 700;
		cursor: pointer;
		border: none;
		background: transparent;
		color: inherit;
	}
</style>

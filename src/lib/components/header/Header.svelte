<script lang="ts">
	import Burger from '../../ui/Burger.svelte';
	import DocumentName from './document-name/DocumentName.svelte';

	import Logo from '../../ui/Logo.svelte';
	import SaveIcon from '../../../assets/icon-save.svg?component';
	import Button from '../../ui/Button.svelte';
	import { modalStore } from '$lib/stores/modalStore';
	import markdownStore, { type IMarkDownData } from '$lib/stores/markdowmsStore';
	import formStore from '$lib/stores/formStore';
	import { v4 as uuidv4 } from 'uuid';
	import { format } from 'date-fns';
	import { onDestroy } from 'svelte';

	let cuurentMarkdownName = '';
	let cuurentMardownContent = '';

	const unsubFormStore = formStore.subscribe((state) => {
		cuurentMardownContent = state.content;
		cuurentMarkdownName = state.name;
	});

	const saveHandler = () => {
		markdownStore.update((state) => {
			const { markdownsData, currentMarkDown } = state;
			if (currentMarkDown === '') {
				const id = uuidv4();
				const date = format(new Date(), 'MM-dd-yyyy');
				let newMarkDown: IMarkDownData = {
					createdAt: date,
					name: cuurentMarkdownName,
					content: cuurentMardownContent,
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
				markDownToUpdate.content = cuurentMardownContent;
				markDownToUpdate.name = cuurentMarkdownName;
			}

			return {
				...state,
				markdownsData: copiedMarkDownData
			};
		});
	};
</script>

<header>
	<Burger />

	<Logo isHeader={true} />

	<DocumentName />

	<button class="delete_btn_wrapper" on:click={modalStore.toggleModal}>
		<svg width="18" height="20" xmlns="http://www.w3.org/2000/svg"
			><path
				d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
				fill="#7C8187"
			/></svg
		>
	</button>
	<Button type="save" on:click={saveHandler}>
		<SaveIcon />

		<span class="save_btn_text"> Save Changes </span>
	</Button>
</header>

<style>
	header {
		background-color: var(--color-800);
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.delete_btn_wrapper {
		cursor: pointer;
		background-color: transparent;
		border: none;
	}

	.delete_btn_wrapper:hover svg {
		transition: transform 0.3s ease;
	}

	.delete_btn_wrapper:hover svg path {
		fill: var(--color-orange);
	}

	.delete_btn_wrapper:active svg {
		transform: scale(0.9);
	}

	button {
		margin: 0 0.8rem 0 1.6rem;
	}

	.save_btn_text {
		display: block;
	}

	@media (max-width: 640px) {
		.save_btn_text {
			display: none;
		}
	}
</style>

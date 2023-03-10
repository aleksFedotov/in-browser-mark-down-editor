<script>
	import { createEventDispatcher } from 'svelte';
	export let type = 'default';

	const dispatch = createEventDispatcher();
</script>

<button class={type === 'save' ? 'save_btn' : 'default'} on:click>
	<slot />
</button>

<style>
	button {
		padding: 12px 24px;
		background-color: var(--color-orange);
		color: var(--color-100);
		border-radius: 4px;
		transition: transform 0.3s ease;
		border: none;
		font-family: 'Roboto', sans-serif;
		font-size: 1.5rem;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
		width: 100%;
	}

	button:hover {
		background-color: var(--color-orange-hover);
	}
	button:active {
		transform: scale(0.98);
	}

	.save_btn {
		margin: 0 1.6rem 0 0.8rem;
		width: fit-content;
	}

	@media (max-width: 640px) {
		.save_btn {
			height: 4rem;
			aspect-ratio: 1;
			padding: 0;
		}
	}
</style>

<script>
	import { sideBarStore } from '$lib/stores/sideBarStore';
</script>

<div class="burger_wrapper">
	<div
		class={$sideBarStore ? 'burger close' : 'burger'}
		on:click={sideBarStore.toggleSideBar}
		on:keydown={() => {}}
		data-testid="burger"
	>
		<div class="dash" />
	</div>
</div>

<style>
	.burger_wrapper {
		height: 100%;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		background-color: var(--color-700);
		padding: 0 2.1rem;
	}

	.burger {
		width: 30px;
		padding: 0;
		cursor: pointer;
	}

	.burger:before,
	.burger:after,
	.dash {
		background: #fff;
		content: '';
		display: block;
		height: 2px;
		margin: 5px 0;
		transition: 0.5s;
	}

	.burger:hover:before {
		transform: translateY(0px) rotate(0.5turn);
	}
	.burger:hover:after {
		transform: translateY(0px) rotate(-0.5turn);
	}
	.burger:hover .dash {
		transform: scale(0);
	}

	.burger.close:before {
		transform: translateY(7px) rotate(1.125turn);
	}
	.burger.close:after {
		transform: translateY(-7px) rotate(-1.125turn);
	}
	.burger.close .dash {
		transform: scale(0);
	}

	@media (max-width: 640px) {
		.burger_wrapper {
			padding: 0 1.2rem;
		}
	}
</style>

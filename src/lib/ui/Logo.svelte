<script lang="ts">
	import Logo from '../../assets/logo.svg?component';
	export let isHeader: Boolean;
</script>

<div class="logo_wrapper" class:header={isHeader}>
	<Logo />
</div>

<style>
	.logo_wrapper {
		border-right: 1px solid var(--color-600);
		padding: 0 3rem;
		height: 4rem;
		display: flex;
		align-items: center;
	}

	@media (max-width: 1080px) {
		.logo_wrapper {
			border-right: none;
			padding: 0;
			margin-bottom: 1.6rem;
		}

		.logo_wrapper.header {
			display: none;
		}
	}
</style>

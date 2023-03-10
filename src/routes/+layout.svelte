<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import SideBar from '$lib/components/sidebar/SideBar.svelte';
	import '../styles/global.css';
	import { sideBarStore } from '$lib/stores/sideBarStore';
	import { modalStore } from '$lib/stores/modalStore';
	import Modal from '$lib/ui/Modal.svelte';
</script>

<main>
	<SideBar />
	<section class:opened={$sideBarStore}>
		<Header />
		<slot />
	</section>
</main>
{#if $modalStore}
	<Modal />
{/if}

<style>
	main {
		overflow-x: hidden;
	}
	section {
		transform: translate(0);
		transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
		overflow-y: hidden;
	}
	.opened {
		transform: translate(25rem);
	}
</style>

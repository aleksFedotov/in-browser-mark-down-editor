<script lang="ts">
	import themeStore from '$lib/stores/themeStore';
	let isDarktheme: boolean;

	$: isDarktheme = $themeStore === 'dark';

	let theme = 'dark';
</script>

<div class="toggle_wrapper">
	<div class="icon icon_dark" class:selected={isDarktheme} data-testid="toggle_dark">
		<svg width="17" height="16" xmlns="http://www.w3.org/2000/svg"
			><path
				d="M16.141 8.804a.823.823 0 0 0-.864-.115 6.622 6.622 0 0 1-2.772.6A6.704 6.704 0 0 1 5.81 2.626 7.066 7.066 0 0 1 6.015.981a.823.823 0 0 0-1.094-.93 8.341 8.341 0 1 0 11.516 9.617.823.823 0 0 0-.296-.864Zm-7.814 5.503A6.696 6.696 0 0 1 4.164 2.404v.222a8.35 8.35 0 0 0 10.069 8.16 6.671 6.671 0 0 1-5.906 3.554v-.033Z"
				fill="#5A6069"
			/></svg
		>
	</div>

	<div
		class="toggle"
		class:dark={isDarktheme}
		class:light={!isDarktheme}
		on:click={themeStore.toggleTheme}
		on:keydown={() => {}}
		data-testid="toggle"
	/>

	<div class="icon icon_light" class:selected={!isDarktheme} data-testid="toggle_light">
		<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"
			><path
				d="M2.7 9a.9.9 0 0 0-.9-.9H.9a.9.9 0 0 0 0 1.8h.9a.9.9 0 0 0 .9-.9Zm.576 4.5-.639.639a.9.9 0 0 0 0 1.269.9.9 0 0 0 1.269 0l.639-.639A.9.9 0 0 0 3.276 13.5ZM9 2.7a.9.9 0 0 0 .9-.9V.9a.9.9 0 0 0-1.8 0v.9a.9.9 0 0 0 .9.9Zm5.094 2.106a.9.9 0 0 0 .63-.261l.639-.639a.9.9 0 1 0-1.269-1.269l-.594.639a.9.9 0 0 0 0 1.269.9.9 0 0 0 .594.261Zm-10.8-.261a.9.9 0 0 0 1.269 0 .9.9 0 0 0 0-1.269l-.639-.639a.904.904 0 1 0-1.287 1.269l.657.639ZM17.1 8.1h-.9a.9.9 0 1 0 0 1.8h.9a.9.9 0 1 0 0-1.8Zm-2.376 5.4a.9.9 0 0 0-1.224 1.224l.639.639a.9.9 0 0 0 1.269 0 .9.9 0 0 0 0-1.269l-.684-.594ZM9 4.05A4.95 4.95 0 1 0 13.95 9 4.959 4.959 0 0 0 9 4.05Zm0 8.1a3.15 3.15 0 1 1 0-6.3 3.15 3.15 0 0 1 0 6.3Zm0 3.15a.9.9 0 0 0-.9.9v.9a.9.9 0 1 0 1.8 0v-.9a.9.9 0 0 0-.9-.9Z"
				fill="#5A6069"
			/></svg
		>
	</div>
</div>

<style>
	.toggle_wrapper {
		display: flex;
		align-items: center;
		padding: 0.8rem 0;
		cursor: pointer;
		color: var(--color-100);
		margin-top: auto;
		gap: 0.8rem;
	}

	.toggle {
		height: 24px;
		width: 48px;
		background-color: var(--color-600);
		border-radius: 12px;
	}

	.toggle::before {
		content: '';
		display: block;
		height: 12px;
		aspect-ratio: 1;
		margin-top: 6px;
		margin-left: 6px;
		border-radius: 30px;
		background: var(--color-100);
		position: absolute;
		z-index: 2;
	}

	.icon_dark,
	.icon_light {
		width: 18px;
	}

	.toggle.light::before {
		animation: toggleLight 0.25s ease-out;
		animation-fill-mode: forwards;
	}
	.toggle.dark::before {
		animation: toggleDark 0.25s ease-out;
	}

	svg path {
		transition: fill 0.25s ease-out;
	}

	.selected svg path {
		fill: var(--color-100);
	}

	@keyframes toggleLight {
		0% {
			width: 1.2rem;
			transform: translateX(0);
		}
		20% {
			width: 2.4rem;
		}
		100% {
			width: 1.2rem;
			transform: translateX(2.4rem);
		}
	}
	@keyframes toggleDark {
		0% {
			width: 1.2rem;
			transform: translateX(2.4rem);
		}
		80% {
			width: 2.4rem;
		}
		100% {
			width: 1.2rem;
			transform: translateX(0);
		}
	}
</style>

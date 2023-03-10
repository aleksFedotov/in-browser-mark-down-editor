<script lang="ts">
	import Editor from '$lib/components/editor/Editor.svelte';
	import themeStore from '$lib/stores/themeStore';

	if (typeof localStorage !== 'undefined') {
		let storedTheme =
			localStorage.getItem('theme') ||
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		if (storedTheme) {
			document.documentElement.setAttribute('data-theme', storedTheme);
			themeStore.setTheme(storedTheme === 'dark');
		}
	}
</script>

<Editor />

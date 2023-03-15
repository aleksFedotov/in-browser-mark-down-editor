<script lang="ts">
	import DocIcon from '../../assets/icon-document.svg?component';
	import markdownStore from '$lib/stores/markdowmsStore';
	export let date: string;
	export let fileName: string;
	export let markdownId: string;

	const clickHandler = () => {
		markdownStore.selectMarkDown(markdownId);
	};
</script>

<div class="document_info" data-testid="document_info">
	<div>
		<DocIcon />
	</div>
	<div class="documnet_info_text" on:click={clickHandler} on:keydown={() => {}}>
		<span class="documnet_info_text_date">{date}</span>
		<span class="documnet_info_text_name heading_m">{fileName}</span>
	</div>
</div>

<style>
	.document_info {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		cursor: pointer;
		transition: transform 0.3s ease;
	}

	.documnet_info_text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.documnet_info_text_date {
		color: var(--color-500);
	}

	.documnet_info_text_name {
		font-weight: 400;
	}

	.document_info:hover .documnet_info_text_name {
		color: var(--color-orange);
	}

	.document_info:active {
		transform: scale(0.98);
	}
</style>

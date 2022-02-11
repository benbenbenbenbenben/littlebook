<script lang="ts">
	export let foo: string;
	let hoveringOrSelected;
	import { fade } from 'svelte/transition';
	import { Drag, BottomCorner } from 'svelte-grommet-icons';
	import { xlink_attr } from 'svelte/internal';
	let resizing = false;
	let content: HTMLElement;
	let contentWidth = '100%';
	let contentHeight = '400px';
	/**
	 *
	 */
</script>

<div
	class="draggable-item"
	on:mouseleave={() => (hoveringOrSelected = false)}
	on:mouseenter={() => (hoveringOrSelected = true)}
	style="--content-width:{contentWidth};--content-height:{contentHeight}"
>
	{#if hoveringOrSelected}
		<div
			class="drag-handle"
			contenteditable="false"
			draggable="true"
			data-drag-handle
			transition:fade
		>
			<Drag />
		</div>
		<div
			class="size-handle"
			contenteditable="false"
			transition:fade
			on:mousedown={(e) => {
				e.preventDefault();
				const { width, height } = content.getBoundingClientRect();
				resizing = true;
				const onMove = (r) => {
					const [dx, dy] = [r.x - e.x, r.y - e.y];
					contentWidth = `${width + dx}px`;
					contentHeight = `${height + dy}px`;
				};
				document.addEventListener('mousemove', onMove);
				document.addEventListener('mouseup', () => {
					resizing = false;
					document.removeEventListener('mousemove', onMove);
				});
			}}
		>
			<BottomCorner />
		</div>
	{/if}
	<div class="content" bind:this={content}>
		{#if resizing}
			<div
				style="opacity:0; background: red; width:100%;height:100%; position: absolute; top:0;left:0;"
			/>
		{/if}
		<iframe
			src="https://www.tldraw.com/r/1638145075610"
			style="border: 0; width:100%;height:100%"
		/>
	</div>
</div>

<style lang="scss">
	.draggable-item {
		position: relative;
		//padding: 0.5rem;
		//margin: 0.5rem 0;
		//border-radius: 0.5rem;
		background: white;
		height: var(--content-height, 400px);
		width: var(--content-width, 100%);
		.drag-handle {
			position: absolute;
			top: 0.3rem;
			margin-right: 0.5rem;
			cursor: grab;
			transform: translateX(-2rem);
		}
		.content {
			width: 100%;
			height: 100%;
		}
		.size-handle {
			position: absolute;
			right: 0;
			bottom: 0;
			cursor: nwse-resize;
			background-color: white;
			border: 1px solid black;
		}
	}
</style>

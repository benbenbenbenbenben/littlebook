<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Document from '@tiptap/extension-document';
	import Placeholder from '@tiptap/extension-placeholder';

	let element;
	let editor;

	const CustomDocument = Document.extend({
		content: 'heading block*'
	});

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				CustomDocument,
				StarterKit.configure({ document: false }),
				Placeholder.configure({
					placeholder: ({ node }) => {
						if (node.type.name === 'heading') {
							return "What's the title?";
						}
						return 'Can you add some further context?';
					}
				})
			],
			content: `
      <h1>It'll always have a heading...</h1>
      <p>Hello World! 🌍️ </p>
      `,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{/if}

<div bind:this={element} />

<style>
	button.active {
		background: black;
		color: white;
	}
</style>

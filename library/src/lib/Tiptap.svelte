<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Document from '@tiptap/extension-document';
	import Placeholder from '@tiptap/extension-placeholder';
	import { Button } from 'attractions';
	import NodeView from './NodeView';

	let element;
	let editor: Editor;

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
				}),
				NodeView
			],
			content: `
      <h1>It'll always have a heading...</h1>
	  <node-view></node-view>
	  <my-counter></my-counter>
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
	<div style="display: flex;">
		<Button
			small
			rectangle
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			selected={editor.isActive('heading', { level: 1 })}
		>
			H1
		</Button>
		<Button
			small
			rectangle
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			selected={editor.isActive('heading', { level: 2 })}
		>
			H2
		</Button>
		<Button
			small
			rectangle
			on:click={() => editor.chain().focus().setParagraph().run()}
			selected={editor.isActive('paragraph')}
		>
			P
		</Button>
	</div>
{/if}

<div bind:this={element} />

<style>
	.active {
		background: black;
		color: white;
	}
</style>

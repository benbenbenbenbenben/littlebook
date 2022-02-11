<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Document from '@tiptap/extension-document';
	import Placeholder from '@tiptap/extension-placeholder';
	import { Button } from 'attractions';
	import Collaboration from '@tiptap/extension-collaboration';
	import CollaborationCursor from '@tiptap/extension-collaboration-cursor';

	import { ColorHighlighter } from './LinksAdorn';

	import * as Y from 'yjs';
	import { WebrtcProvider } from 'y-webrtc';
	import { HocuspocusProvider } from '@hocuspocus/provider';
	import { IndexeddbPersistence } from 'y-indexeddb';

	import IFrame from './blocks/iframe';

	import { Node, mergeAttributes } from '@tiptap/core';
	//import NodeView from './NodeView';
	import IFrameBlock from './IFrameBlock.svelte';
	const NodeView = Node.create({
		name: 'nodeView',
		group: 'block',
		atom: true,
		parseHTML: () => [{ tag: 'node-view' }],
		renderHTML: ({ HTMLAttributes }) => ['node-view', mergeAttributes(HTMLAttributes)],
		addNodeView:
			() =>
			({ editor, node, getPos }) => {
				console.log('creating node in tiptap');
				const dom = document.createElement('div');
				const slot = new IFrameBlock({ target: dom, props: { foo } });
				return { dom };
			}
	});

	const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D'];
	const names = [
		'Lea Thompson',
		'Cyndi Lauper',
		'Tom Cruise',
		'Madonna',
		'Jerry Hall',
		'Joan Collins',
		'Winona Ryder',
		'Christina Applegate',
		'Alyssa Milano',
		'Molly Ringwald',
		'Ally Sheedy',
		'Debbie Harry',
		'Olivia Newton-John',
		'Elton John',
		'Michael J. Fox',
		'Axl Rose',
		'Emilio Estevez',
		'Ralph Macchio',
		'Rob Lowe',
		'Jennifer Grey',
		'Mickey Rourke',
		'John Cusack',
		'Matthew Broderick',
		'Justine Bateman',
		'Lisa Bonet'
	];
	const getRandomElement = (list) => list[Math.floor(Math.random() * list.length)];
	const getRandomColor = () => getRandomElement(colors);
	const getRandomName = () => getRandomElement(names);

	let element;
	let editor: Editor;
	let foo = 'bar';
	let webrtcProvider: WebrtcProvider;
	let websocketProvider: HocuspocusProvider;
	let idbProvider: IndexeddbPersistence;
	let ydoc: Y.Doc;

	const CustomDocument = Document.extend({
		content: 'heading block*'
	});

	onMount(() => {
		ydoc = new Y.Doc();
		webrtcProvider = new WebrtcProvider('mr-potato-head', ydoc);
		websocketProvider = new HocuspocusProvider({
			url: `ws://${window.location.host.split(":").at(0)}:1234`,
			name: 'mr-potato-head',
			document: ydoc
		});
		idbProvider = new IndexeddbPersistence('mr-potato-head', ydoc);
		editor = new Editor({
			element: element,
			extensions: [
				CustomDocument,
				StarterKit.configure({ document: false, history: false }),
				Placeholder.configure({
					placeholder: ({ node }) => {
						if (node.type.name === 'heading') {
							return "What's the title?";
						}
						return 'Can you add some further context?';
					}
				}),
				NodeView,
				Collaboration.configure({
					document: ydoc
				}),
				CollaborationCursor.configure({
					provider: websocketProvider,
					user: {
						name: getRandomName(),
						color: getRandomColor()
					}
				}),
				ColorHighlighter,
				IFrame
			],
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
		if (webrtcProvider) {
			webrtcProvider.destroy();
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

<style lang="scss">
	.active {
		background: black;
		color: white;
	}

	:global(.color) {
		white-space: nowrap;

		&::before {
			background-color: var(--color);
			border: 1px solid rgba(128, 128, 128, 0.3);
			border-radius: 2px;
			content: ' ';
			display: inline-block;
			height: 1em;
			margin-bottom: 0.15em;
			margin-right: 0.1em;
			vertical-align: middle;
			width: 1em;
		}
	}

	/* Give a remote user a caret */
	:global(.collaboration-cursor__caret) {
		border-left: 1px solid #0d0d0d;
		border-right: 1px solid #0d0d0d;
		margin-left: -1px;
		margin-right: -1px;
		pointer-events: none;
		position: relative;
		word-break: normal;
	}

	/* Render the username above the caret */
	:global(.collaboration-cursor__label) {
		border-radius: 3px 3px 3px 0;
		color: #0d0d0d;
		font-size: 12px;
		font-style: normal;
		font-weight: 600;
		left: -1px;
		line-height: normal;
		padding: 0.1rem 0.3rem;
		position: absolute;
		top: -1.4em;
		user-select: none;
		white-space: nowrap;
	}
</style>

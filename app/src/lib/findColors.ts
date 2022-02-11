import { Decoration, DecorationSet } from 'prosemirror-view';
import type { Node } from 'prosemirror-model';
import LinkButton from '../lib/LinkButton.svelte'

export default function (doc: Node): DecorationSet {
	const hexColor = /http(s?):\/\/[^\s]*/gi;
	const decorations: Decoration[] = [];

	doc.descendants((node, position) => {
		if (!node.text) {
			return;
		}

		Array.from(node.text.matchAll(hexColor)).forEach((match) => {
			const color = match[0];
			const index = match.index || 0;
			const from = position + index;
			const to = from + color.length;
			let decoration = Decoration.inline(from, to, {
				class: 'color',
				style: `--color: ${color}`
			});

			decoration = Decoration.widget(to, (view, getPos) => {
				const dom = document.createElement('span');
				new LinkButton({ target: dom, props: {
          playActivity: () => {
            debugger
          }
        } });
				return dom;
			});

			//decoration = Decoration.node(from, to, { nodeName: 'node-view' });

			decorations.push(decoration);
		});
	});

	return DecorationSet.create(doc, decorations);
}

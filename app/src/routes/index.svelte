<script lang="ts">
	import Tiptap from '$lib/Tiptap.svelte';
	import { Accordion, AccordionSection, Button } from 'attractions';
	import { ChevronDownIcon } from 'svelte-feather-icons';
	import Emoji from 'svelte-emoji';

	let sidebarAndBodyWidth = '300px 1fr';
</script>

<main>
	<div class="container" style="--sidebar-and-body-width: {sidebarAndBodyWidth}">
		<div class="sidebar">
			<Button small rectangle noRipple>
				<Emoji symbol="🏠" label="book" />Acme Tuber Company</Button
			>
			<Accordion let:closeOtherPanels>
				<AccordionSection on:panel-open={closeOtherPanels}>
					<div slot="handle" let:toggle>
						<Button small rectangle on:click={toggle}>
							<Emoji symbol="⚙️" label="book" />Team API
							<ChevronDownIcon size="20" class="ml accordion-chevron" />
						</Button>
					</div>
					<div style="margin-left: 1rem;">
						<Button small rectangle noRipple>Team API</Button>
					</div>
				</AccordionSection>
				<AccordionSection on:panel-open={closeOtherPanels}>
					<div slot="handle" let:toggle>
						<Button small rectangle on:click={toggle}>
							<Emoji symbol="📖" label="book" />Catalog
							<ChevronDownIcon size="20" class="ml accordion-chevron" />
						</Button>
					</div>
					Catalog
				</AccordionSection>
				<AccordionSection on:panel-open={closeOtherPanels}>
					<div slot="handle" let:toggle>
						<Button small rectangle on:click={toggle}>
							<Emoji symbol="💪" label="book" />Workshops Material
							<ChevronDownIcon size="20" class="ml accordion-chevron" />
						</Button>
					</div>
					<div style="margin-left: 1rem;">
						<Accordion let:closeOtherPanels>
							<AccordionSection on:panel-open={closeOtherPanels}>
								<div slot="handle" let:toggle>
									<Button small rectangle on:click={toggle}>
										<Emoji symbol="🗺️" label="book" />Wardley Maps
										<ChevronDownIcon size="20" class="ml accordion-chevron" />
									</Button>
								</div>
								<Button small rectangle noRipple>Potato Sorting System</Button>
								<Button small rectangle noRipple>Drum-o-Matic Peeler</Button>
								<Button small rectangle noRipple>Farm to Shop Enabling</Button>
								<Button small rectangle class="subtle" noRipple>+ new map</Button>
							</AccordionSection>
						</Accordion>
					</div>
				</AccordionSection>
			</Accordion>
			<Button small rectangle class="subtle" noRipple>+ new chapter</Button>
		</div>
		<div class="body">
			<Tiptap />
		</div>
	</div>
</main>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: var(--sidebar-and-body-width, 300px 1fr);
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas: 'sidebar body';
	}

	.body {
		grid-area: body;
	}

	.sidebar {
		grid-area: sidebar;
	}
	:global(.subtle) {
		color: lightgray !important;
	}
</style>

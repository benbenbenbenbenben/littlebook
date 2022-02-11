<script lang="ts">
import { Button, Chip } from "attractions";
import { Drag, Link } from "svelte-grommet-icons";
import { LinkIcon, PlayIcon, SquareIcon } from 'svelte-feather-icons'

export let playActivity: () => void;

</script>
<Button small round class="inline"><LinkIcon size="1x" /></Button>
<Button small round class="inline" on:click={playActivity}><PlayIcon size="1x" /></Button>
<style lang="scss">
    :global(.inline) {
        display: inline !important;
    }
</style>
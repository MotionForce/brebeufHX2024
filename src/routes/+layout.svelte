<script lang="ts">
  import "../app.postcss";
  import { AppShell } from "@skeletonlabs/skeleton";
  import NavBar from "$lib/components/NavBar.svelte";

  // Floating UI for Popups
  import {
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow,
  } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  export let data;
</script>

<AppShell>
  <svelte:fragment slot="header">
    <NavBar username={data.username} session_status={data.session_status} />
  </svelte:fragment>
  <!-- (sidebarLeft) -->
  <!-- (sidebarRight) -->
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <svelte:fragment slot="pageFooter">
    <footer class="p-2 bg-surface-100-800-token">
      Copyright Andrey Kovalskiy and Émilien Lavallée 2024. All rights reserved.
    </footer>
  </svelte:fragment>
  <!-- (footer) -->
</AppShell>

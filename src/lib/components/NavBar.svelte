<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { minidenticon } from "minidenticons";
  import { LightSwitch } from "@skeletonlabs/skeleton";

  export let username: string = "";
  export let session_status = false;
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <a href="/">
      <iconify-icon icon="" width="30"></iconify-icon>
    </a>
  </svelte:fragment>
  <a class="h2 font-bold" href="/">Brébeuf Nature Science Council</a>
  <svelte:fragment slot="trail">
    {#if session_status === false}
      <a href="/signup" class="btn variant-filled">Signup</a>
    {:else}
      <a href="/create-post" class="btn variant-ghost-primary">Create post</a>
      <a href="/profile">
        <Avatar
          src={"data:image/svg+xml;utf8," +
            encodeURIComponent(minidenticon(username, 60, 50))}
          width="w-14"
          rounded="rounded-full"
        />
      </a>
    {/if}
    <LightSwitch />
  </svelte:fragment>
</AppBar>

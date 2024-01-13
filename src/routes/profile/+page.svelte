<script lang="ts">
  import { enhance } from "$app/forms";
  import { Avatar } from "@skeletonlabs/skeleton";

  import type { PageData } from "./$types";
  import { minidenticon } from "minidenticons";

  export let data: PageData;
</script>

<div
  class="mx-20 my-10 p-10 flex flex-col space-y-5 bg-surface-300-600-token rounded-3xl"
>
  <div class="flex flex-row justify-between items-center">
    <div class="flex flex-col space-y-6">
      <h1 class="h1 mb-5">{data.username}'s Profile</h1>
      {#if data.interests !== undefined}
        <p class="text-lg">Interests: {data.interests.join(", ")}</p>
      {/if}
      {#if data.signout === true}
        <form method="post" action="?/logout" use:enhance>
          <button class="btn variant-filled">Sign out</button>
        </form>
      {/if}
    </div>
    <div>
      <Avatar
        src={"data:image/svg+xml;utf8," +
          encodeURIComponent(minidenticon(data.username, 60, 50))}
        width="w-64"
        rounded="rounded-full"
      />
    </div>
  </div>
</div>

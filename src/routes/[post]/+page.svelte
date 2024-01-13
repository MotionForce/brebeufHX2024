<script lang="ts">
  import { minidenticon } from "minidenticons";
  import type { PageData } from "./$types";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { default as prettyDate } from "pretty-easy-dates";

  export let data: PageData;
</script>

<div class="m-16">
  <div
    class="p-16 flex flex-col space-y-5 variant-filled-primary rounded-3xl"
  >
    <div class="flex flex-row items-center space-x-4">
      {#if data.post.User !== null}
        <Avatar
          src={"data:image/svg+xml;utf8," +
            encodeURIComponent(minidenticon(data.post.User.username, 60, 50))}
          width="w-12"
          rounded="rounded-full"
          border="border-2"
        />
      {/if}
      <h2 class="h2">{data.post.title}</h2>
    </div>
    <p class="text-sm">{prettyDate(data.post.createdAt)["now"]}</p>
    <p class="text-xl">{data.post.body}</p>
    {#if data.post.User !== null}
      <p class="text-md">By {data.post.User.username}</p>
    {/if}
  </div>

  {#each data.post.Reply as reply}
    <div class="m-8 ml-16 mr-0 px-16 py-4 mt-4 flex flex-col space-y-5 variant-ghost-secondary rounded-3xl">
      <div class="flex flex-row items-center space-x-4">
        {#if reply.User !== null}
          <Avatar
            src={"data:image/svg+xml;utf8," +
              encodeURIComponent(minidenticon(reply.User.username, 60, 50))}
            width="w-12"
            rounded="rounded-full"
            border="border-2"
          />
        {/if}
      </div>
      <p class="text-xs">{prettyDate(reply.createdAt)["now"]}</p>
      <p class="text-lg">{reply.body}</p>
      {#if reply.User !== null}
        <p class="text-sm">By {reply.User.username}</p>
      {/if}
    </div>
  {/each}
</div>

<script lang="ts">
  import { minidenticon } from "minidenticons";
  import type { PageData } from "./$types";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { default as prettyDate } from "pretty-easy-dates";
  import { enhance } from "$app/forms";

  function onReplyClickHandler() {
    show_reply_box = !show_reply_box;
  }

  let reply: String;
  let show_reply_box = false;

  export let data: PageData;
  $: post_id = data.post.id;
</script>

<div class="m-16 flex flex-col">
  <div
    class="p-16 mb-8 flex flex-col space-y-5 variant-filled-primary rounded-3xl"
  >
    <div class="flex flex-row items-center space-x-4">
      {#if data.post.User !== null}
        <a
          href={data.post.User.id === data.userId
            ? "/profile"
            : `/profile?id=${data.post.User.id}`}
        >
          <Avatar
            src={"data:image/svg+xml;utf8," +
              encodeURIComponent(minidenticon(data.post.User.username, 60, 50))}
            width="w-12"
            rounded="rounded-full"
            border="border-2"
          />
        </a>
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
    {#if reply.warning !== "LOW" && reply.warning !== "UNTESTED"}
      <div
        class="m-8 ml-16 mr-0 px-16 py-4 mt-4 flex flex-col space-y-5 variant-ghost-secondary rounded-3xl"
      >
        This reply by {reply.User.username} has been flagged as potentionaly NSFW
        or disrespectful.
      </div>
    {:else}
      <div
        class="m-8 ml-16 mr-0 px-16 py-4 mt-4 flex flex-col space-y-5 variant-ghost-secondary rounded-3xl"
      >
        <div class="flex flex-row items-center space-x-4">
          {#if reply.User !== null}
            <a
              href={reply.User.id === data.userId
                ? "/profile"
                : `/profile?id=${reply.User.id}`}
            >
              <Avatar
                src={"data:image/svg+xml;utf8," +
                  encodeURIComponent(minidenticon(reply.User.username, 60, 50))}
                width="w-12"
                rounded="rounded-full"
                border="border-2"
              />
            </a>
          {/if}
        </div>
        <p class="text-xs">{prettyDate(reply.createdAt)["now"]}</p>
        <p class="text-lg">{reply.body}</p>
        {#if reply.User !== null}
          <p class="text-sm">By {reply.User.username}</p>
        {/if}
      </div>
    {/if}
  {/each}
  <button
    class={`${
      show_reply_box ? "hidden" : "btn variant-ghost-tertiary max-w-12 self-end"
    }`}
    on:click={onReplyClickHandler}>Reply</button
  >
  <form
    method="POST"
    action="?/reply"
    class={`${
      show_reply_box ? "inline-flex" : "hidden"
    } m-4 ml-16 mr-0 px-8 py-2 mt-4 flex flex-row space-x-5 variant-ghost-secondary rounded-3xl`}
    use:enhance
  >
    <textarea
      placeholder="Enter the reply."
      name="reply"
      rows="4"
      class="textarea rounded-xl"
    ></textarea>
    <input type="number" name="post_id" bind:value={post_id} hidden />
    <button type="submit" class="btn variant-filled place-self-center"
      >Send reply</button
    >
  </form>
</div>

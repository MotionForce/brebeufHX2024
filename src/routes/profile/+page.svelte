<script lang="ts">
  import { enhance } from "$app/forms";
  import { Avatar } from "@skeletonlabs/skeleton";

  import type { PageData } from "./$types";
  import { minidenticon } from "minidenticons";
  import PostPreview from "$lib/components/PostPreview.svelte";
  import { goto } from "$app/navigation"; 

  function sendTo(url: string) {
    goto(url);
  }

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

{#if data.post !== undefined}
  {#each data.post as post}
    <div class="m-8">
      {#if post.warning !== "LOW" && post.warning !== "UNTESTED"}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:dblclick={() => sendTo(`/${post.id}`)}>
          <div class="relative z-10">
            <div class="absolute mt-20 l-0 translate-x-[50%]">
              <p>
                This post has been flagged as potentionaly NSFW or
                disrespectful. Please double click it to continue.
              </p>
            </div>
          </div>
          <div
            class="m-16 blur card card-hover p-4 variant-filled-surface border-2"
          >
            <header class="card-header">
              <div class="flex flex-row items-center space-x-4">
                {#if post.User !== null}
                  <Avatar
                    src={"data:image/svg+xml;utf8," +
                      encodeURIComponent(
                        minidenticon(post.User.username, 60, 50),
                      )}
                    width="w-12"
                    rounded="rounded-full"
                    border="border-2"
                  />
                {/if}
                <h2 class="h2">{post.title}</h2>
                <span class="chip h-full variant-filled rounded-3xl">
                  {post.Reply.length}
                  <br />
                  <iconify-icon icon="bi:reply-fill" flip="horizontal">
                  </iconify-icon>
                </span>
              </div>
            </header>
            <section class="p-4">
              {post.body}
              {#if post.User !== null}
                <br /><br />By {post.User.username}
              {/if}
            </section>
          </div>
        </div>
      {:else}
        <PostPreview {data} {post} />
      {/if}
    </div>
  {/each}
{/if}

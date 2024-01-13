<script lang="ts">
  import { minidenticon } from "minidenticons";
  import type { PageData } from "./$types";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
  import PostPreview from "$lib/components/PostPreview.svelte";

  function sendTo(url: string) {
    goto(url);
  }

  export let data: PageData;
</script>

{#if data.similar_users === null}<br />{:else}
  <div
    class="mx-32 my-8 card border-2 border-surface-400-500-token p-6 variant-filled-surface flex flex-col space-y-4 overflow-x-scroll"
  >
    <p class="font-bold">Users with similar interests</p>
    <div class="flex flex-row space-x-5">
      {#each data.similar_users as similar_user, i}
        {#if i !== 0}
          <span class="divider-vertical h-20" />
        {/if}
        <div class="flex flex-col items-center">
          <span>
            <a
              href={similar_user.id === data.userId
                ? "/profile"
                : `/profile?id=${similar_user.id}`}
            >
              <Avatar
                src={"data:image/svg+xml;utf8," +
                  encodeURIComponent(
                    minidenticon(similar_user.username, 60, 50),
                  )}
                width="w-12"
                rounded="rounded-full"
                border="border-2"
              />
            </a>
          </span>
          <span class="flex-auto">{similar_user.username}</span>
        </div>
      {/each}
    </div>
  </div>
{/if}
{#each data.posts as post}
  <div class="m-16">
    {#if post.warning !== "LOW" && post.warning !== "UNTESTED"}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div on:dblclick={() => sendTo(`/${post.id}`)}>
        <div class="relative z-10">
          <div class="absolute mt-20 l-0 translate-x-[50%]">
            <p>
              This post has been flagged as potentionaly NSFW or disrespectful.
              Please double click it to continue.
            </p>
          </div>
        </div>
        <div
          class="m-16 blur card card-hover p-4 variant-ghost-primary border-2"
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

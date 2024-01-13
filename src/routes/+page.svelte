<script lang="ts">
  import { minidenticon } from "minidenticons";
  import type { PageData } from "./$types";
  import { Avatar } from "@skeletonlabs/skeleton";

  export let data: PageData;
</script>

{#each data.posts as post}
  <div class="m-16">
    <a href="/{post.id}">
      <div class="card p-4 variant-filled-surface">
        <header class="card-header">
          <div class="flex flex-row items-center space-x-4">
            {#if post.User !== null}
              <Avatar
                src={"data:image/svg+xml;utf8," +
                  encodeURIComponent(minidenticon(post.User.username, 60, 50))}
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
    </a>
  </div>
{/each}

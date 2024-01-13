<script>
  import { Avatar } from "@skeletonlabs/skeleton";
  import { minidenticon } from "minidenticons";

  export let data;
  export let post;
</script>

<a href={`/${post.id}`}>
  <div
    class="m-16 card card-hover border-2 border-surface-500-400-token p-4 variant-ghost-primary"
  >
    <header class="card-header">
      <div class="flex flex-row items-center space-x-4">
        {#if post.User !== null}
          <a
            href={post.User.id === data.userId
              ? "/profile"
              : `/profile?id=${post.User.id}`}
          >
            <Avatar
              src={"data:image/svg+xml;utf8," +
                encodeURIComponent(minidenticon(post.User.username, 60, 50))}
              width="w-12"
              rounded="rounded-full"
              border="border-2"
            />
          </a>
        {/if}
        <h2 class="h2">{post.title}</h2>
        <span class="chip h-full variant-filled rounded-3xl">
          {post.Reply.length}
          <br />
          <iconify-icon icon="bi:reply-fill" flip="horizontal"> </iconify-icon>
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

<script lang="ts">
  import { enhance } from "$app/forms";

  let post_title = "";
  let post_body = "";
</script>

<div
  class="p-10 m-10 flex flex-col space-y-10 bg-surface-200-700-token rounded-3xl"
>
  <h2 class="h2">Create a new post</h2>
  <form
    method="POST"
    action="?/create"
    class="flex flex-col space-y-5"
    use:enhance
  >
    <input
      name="post_title"
      class="input"
      title="Post title"
      type="text"
      placeholder="Post title"
      bind:value={post_title}
    />
    <textarea
      name="post_body"
      class="textarea"
      rows="6"
      placeholder="Enter the post content."
      bind:value={post_body}
    />
    <button type="submit" class="btn variant-filled">Post</button>
  </form>
</div>

<script lang="ts">
  import { enhance } from "$app/forms";

</script>

<div
  class="m-10 p-10 flex flex-col space-y-5 bg-surface-300-600-token rounded-3xl"
>
  <h1 class="h1 mb-5">Login</h1>
  <form
    method="post"
    use:enhance
    class="flex flex-col space-y-5 border-2 rounded-xl p-4 bg-surface-400-500-token"
  >
    <label>
      <span>Username</span>
      <input
        name="username"
        id="username"
        class="input"
      />
    </label>
    <label>
      <span>Password</span>
      <input
        type="password"
        name="password"
        id="password"
        class="input"
      />
    </label>
    <button class="btn variant-filled">Submit</button>
  </form>
  <a
    href="/signup"
    class="underline self-end"
    data-sveltekit-preload-data="hover">Signup</a
  >
</div>

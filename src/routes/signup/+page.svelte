<script lang="ts">
  import { enhance } from "$app/forms";
  import { InputChip } from "@skeletonlabs/skeleton";

  let interests: string[] = [];

  $: username = "";
  $: password = "";
  $: str_interests = interests.join("|&%&|")
</script>

<div
  class="m-10 p-10 flex flex-col space-y-5 bg-surface-300-600-token rounded-3xl"
>
  <h1 class="h1 mb-5">Sign up</h1>
  <form
    method="post"
    use:enhance
    class="flex flex-col space-y-5 border-2 rounded-xl p-4 bg-surface-400-500-token"
  >
    <label>
      <span>Username</span>
      <input
        bind:value={username}
        name="username"
        id="username"
        class={`input ${
          username !== ""
            ? typeof username !== "string" ||
              username.length < 4 ||
              username.length > 31
              ? "input-error"
              : "input-success"
            : ""
        }`}
      />
    </label>
    <label>
      <span>Password</span>
      <input
        bind:value={password}
        type="password"
        name="password"
        id="password"
        class={`input ${
          password !== ""
            ? typeof password !== "string" ||
              password.length < 6 ||
              password.length > 255
              ? "input-error"
              : "input-success"
            : ""
        }`}
      />
    </label>
    <hr />
    <InputChip
      bind:value={interests}
      name="chips"
      placeholder="Enter your interests..."
    />
    <input hidden class="input" type="text" name="interest" bind:value={str_interests} />
    <button class="btn variant-filled">Submit</button>
  </form>
  <a
    href="/login"
    class="underline self-end"
    data-sveltekit-preload-data="hover">Sign in</a
  >
</div>

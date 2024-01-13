<script lang="ts">
  import Particles, { particlesInit } from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";

  let particlesConfig = {
    particles: {
      color: {
        value: "#f5bde6",
        alpha: 0.2,
      },
      links: {
        enable: true,
        color: "#c6a0f6",
      },
      move: {
        enable: true,
      },
      number: {
        value: 100,
      },
    },
  };

  let onParticlesLoaded = (event) => {
    const particlesContainer = event.detail.particles;
  };

  void particlesInit(async (engine) => {
    await loadFull(engine);
  });
</script>

<Particles
  id="tsparticles"
  class=""
  style=""
  options={particlesConfig}
  on:particlesLoaded={onParticlesLoaded}
  {particlesInit}
/>

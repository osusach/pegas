<script>
  import "../app.css";
  import '@fontsource-variable/inter';
</script>

<div class="h-screen w-screen bg-base-100 text-gray-100">
  <slot class="h-full items-center justify-center" />
</div>

<style>
  :global(body) {
    font-family: 'Inter Variable', sans-serif;
  }
</style>
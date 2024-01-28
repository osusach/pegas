<script>
  import "../app.css";
  import "@fontsource-variable/inter";
</script>

<div class="bg-svg text-base-content">
  <slot class="h-full items-center justify-center" />
</div>

<style>
  :global(body) {
    font-family: "Inter Variable", sans-serif;
  }

  .bg-svg {
    background-color: #202020;
    opacity: 1;
    background:
      linear-gradient(135deg, #b6b6b655 25%, transparent 25%) -40px 0/ 80px 80px,
      linear-gradient(225deg, #b6b6b6 25%, transparent 25%) -40px 0/ 80px 80px,
      linear-gradient(315deg, #b6b6b655 25%, transparent 25%) 0px 0/ 80px 80px,
      linear-gradient(45deg, #b6b6b6 25%, #202020 25%) 0px 0/ 80px 80px;
  }
</style>

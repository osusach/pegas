<script>
  import "../app.css";
  import "@fontsource-variable/inter";
</script>

<div class="bg-svg text-base-content min-h-screen">
  <slot class="h-full items-center justify-center" />
  <footer class="footer p-10 bg-base-200 text-base-content">
    <aside>
      <img class="h-14 w-14" src="/logo_transparent.svg" alt="Open Source Usach logo">
      <h1 class="text-3xl font-bold">Open Source USACH</h1>
    </aside> 
    <nav>
      <h6 class="footer-title">osusach</h6> 
      <a href="https://www.osusach.com/" class="">Website</a>
      <a href="https://github.com/osusach/" class="">Github</a>
      <a href="https://github.com/osusach/oprah" class="">Oprah Git</a>
    </nav> 
  </footer>
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

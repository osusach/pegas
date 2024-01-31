<script>
  import "../app.css";
  import "@fontsource-variable/inter";
</script>

<div class="bg-svg min-h-screen text-base-content">
  <slot class="h-full items-center justify-center" />
  <footer class="footer bg-base-200 p-10 text-base-content">
    <aside>
      <img
        class="h-20"
        src="/logo_transparent.svg"
        alt="Open Source Usach logo"
      />
      <h1 class="text-3xl font-bold">Open Source USACH</h1>
    </aside>
    <nav>
      <h6 class="footer-title text-xl">osusach</h6>
      <a href="https://www.osusach.com/" class="link link-hover">Website</a>
      <a href="https://github.com/osusach/" class="link link-hover">Github</a>
      <a href="https://github.com/osusach/oprah" class="link link-hover">Oprah Git</a>
    </nav>
    <nav>
      <h6 class="footer-title text-xl">Desarrolladores</h6>
      <a href="https://github.com/panquequelol/" class="link link-hover">René Caceres</a>
      <a href="https://github.com/Skyrdow/" class="link link-hover">Lucas Mesías</a>
      <a href="https://github.com/Klefur/" class="link link-hover">Joaquín Saldivia</a>
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

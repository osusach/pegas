<script lang="ts">
  export let filter: (e: Event) => any;
  export let clearFilter: () => any;
</script>

<div class="flex items-center w-full">
  <!-- Buscador con paginacion -->
  <input
    id="filter"
    on:input={filter}
    type="text"
    placeholder="Buscar por titulo, empresa, etc..."
    class="input input-bordered input-md w-full"
  />
  <button
    class="btn-xs btn btn-circle btn-outline hover:btn-error -ms-8"
    on:click={clearFilter}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      /></svg
    >
  </button>
</div>

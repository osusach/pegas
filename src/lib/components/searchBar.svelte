<script lang="ts">
  export let filter: (e: Event) => any;
  export let clearFilter: () => any;
</script>

<div class="flex w-full items-center">
  <!-- Buscador con paginacion -->
  <input
    id="filter"
    on:input={filter}
    type="text"
    placeholder="Buscar por titulo, empresa, etc..."
    class="input input-bordered input-md w-full bg-secondary-content text-white"
  />
  <button
    class="btn btn-circle btn-outline btn-xs -ms-8 align-middle hover:btn-error"
    on:click={clearFilter}
    aria-label="Limpiar filtro"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
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

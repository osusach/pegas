<script lang="ts">
    export let filter: (e: Event) => any;
    export let clearFilter: () => any;
</script>

<div class=" text-black">
    <!-- Buscador con paginacion -->
    <input
        type="text"
        placeholder="Buscar por titulo, empresa, etc..."
        class="w-[20rem] mx-3 px-2 py-1 rounded-sm"
        id="filter"
        on:input={filter}
    />
    <button
        class="h-fit -ms-12 px-2  rounded-full border border-black hover:text-white hover:bg-red-600 hover:border-red-700"
        on:click={clearFilter}
    >
        x
    </button>
</div>
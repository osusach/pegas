<script lang="ts">
	export let page: number;
	export let offersPerPage: number;
	export let pagedOffers: any[];
    export let previousPage: () => any;
    export let nextPage: () => any;

	const see = (e: Event) => {
		console.log(offersPerPage);
	}
</script>

<div class="flex w-full mt-2 me-10 pe-3">
	<!-- Si la pagina es mayor a uno se muestra el boto nde previo -->
	{#if page > 1}
		<button
			class="border border-white rounded-md hover:bg-gray-600 px-2 py-1"
			on:click={previousPage}
		>
			Anterior
		</button>
	{/if}

	<!-- Si no quedan ofertas para una siguiente pagina, no se muestra -->
	{#if pagedOffers.length === offersPerPage}
		<button
			class="w-fit border border-white rounded-md hover:bg-gray-600 px-2 py-1 ml-auto"
			
			on:click={nextPage}
		>
			Siguiente
		</button>
	{/if}
</div>

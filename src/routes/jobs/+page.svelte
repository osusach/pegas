<script lang="ts">
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
	import type { Offer } from '$lib/types';

	let offers: Offer[] = [];
	let pagedOffers: Offer[] = [];
	let page = 1;
	let offersPerPage = 12;

	const allJobs = async () => {
		const res = await fetch('/api/jobs');
		const data = await res.json();

		offers = data;
		pagedOffers = offers.slice(0, offersPerPage);
	};

	// Función para procesar el contenido HTML y mostrar solo el texto
	function procesarContenidoHTML(html: string) {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = html;
		return tempDiv.textContent || tempDiv.innerText;
	}

	// Función para filtrar las ofertas

	const filterOffers = (e: any) => {
		const text = e.target.value.toLowerCase();
		const filteredOffers = offers.filter((offer) => {
			// Retorna la oferta si el texto ingresado se encuentra en el titulo, empresa o contenido
			return (
				offer.content.toLowerCase().includes(text) ||
				offer.id.toLowerCase().includes(text) ||
				offer.source.toLowerCase().includes(text)
			);
		});
		pagedOffers = filteredOffers.slice(0, offersPerPage);
		page = 1;
	};

	// Funciones para la paginación

	const previousPage = () => {
		page--;
		const start = (page - 1) * offersPerPage;
		const end = page * offersPerPage;
		pagedOffers = offers.slice(start, end);
	};

	const nextPage = () => {
		page++;
		const start = (page - 1) * offersPerPage;
		const end = page * offersPerPage;
		pagedOffers = offers.slice(start, end);
	};

	const verMas = (offer: Offer) => {
		goto(`/jobs/${offer.id}`);
	};

	onMount(() => {
		allJobs();
	});
</script>

<main class="max-h-screen">
	<div class="grid grid-cols-3 pt-3">
		<h1 class="w-[33rem] px-4">Trabajos disponibles</h1>
		<div>
			<!-- Buscador con paginacion -->
			<input
				type="text"
				placeholder="Buscar por titulo, empresa, etc..."
				class="w-[33rem] mx-3 py-1 px-2"
				on:input={filterOffers}
			/>
		</div>
		<div class="w-[33rem] mx-3">
			<!-- Si la pagina es mayor a uno se muestra el boto nde previo -->
			{#if page > 1}
				<button
					class="mx-auto bg-yellow-400 hover:bg-yellow-600 text-black px-2 py-1 rounded-sm"
					on:click={previousPage}
				>
					Anterior
				</button>
			{/if}
			<!-- Si no quedan ofertas para una siguiente pagina, no se muestra -->
			{#if pagedOffers.length === offersPerPage}
				<button
					class="mx-auto bg-yellow-400 hover:bg-yellow-600 text-black px-2 py-1 rounded-sm"
					on:click={nextPage}
				>
					Siguiente
				</button>
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-3 h-[54rem]">
		{#each pagedOffers as offer}
			<div
				class="h-fit flex flex-col w-[33rem] bg-stone-700 text-white m-3 p-4 rounded-md"
			>
				<h2 class="p-1">
					{offer.id}
				</h2>
				<h3 class="p-1">
					{offer.source}
				</h3>
				<p
					class="overflow-hidden whitespace-nowrap overflow-ellipsis p-1"
				>
					{procesarContenidoHTML(offer.content)}
				</p>
				<p class="p-1">
					{offer.date}
				</p>
				<button
					class="mx-auto bg-yellow-400 hover:bg-yellow-600 text-black px-2 py-1 rounded-sm"
					on:click={() => verMas(offer)}
				>
					Ver más
				</button>
			</div>
		{/each}
	</div>
</main>

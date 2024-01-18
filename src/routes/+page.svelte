<script lang="ts">
	import { onMount } from 'svelte';
	import type { Offer } from '$lib/utils/types';
	import FilterItem from '$lib/components/filterItem.svelte';
	import OfferCard from '$lib/components/offerCard.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import SearchBar from '$lib/components/searchBar.svelte';

	const offers: Offer[] = [];
	let pagedOffers: Offer[] = [];
	let page = 1;
	let offersPerPage = 6;
	const filtros: string[] = [];

	const allJobs = async () => {
		const res = await fetch('/api/jobs');
		const data = await res.json();

		offers.push(...data);
		pagedOffers = offers.slice(0, offersPerPage);
	};

	onMount(() => {
		allJobs();
	});

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

	const clearFilter = () => {
		// Limpiar el input
		(<HTMLInputElement>document.getElementById('filter')).value = '';
		pagedOffers = offers.slice(0, offersPerPage);
		page = 1;
	};

	const manageFilters = (text: string[]) => {
		text.map((t) => {
			if (filtros.includes(t)) {
				filtros.splice(filtros.indexOf(t), 1);
			} else {
				filtros.push(t);
			}
		});
		filterByOptions();
		console.log(filtros);
	};

	const filterByOptions = () => {
		const filteredOffers = offers.filter((offer) => {
			if (filtros.length === 0) {
				return true;
			}
			return filtros
				.map((filtro) => {
					return (
						offer.content
							.toLowerCase()
							.includes(filtro.toLowerCase()) ||
						offer.id.toLowerCase().includes(filtro.toLowerCase()) ||
						offer.source
							.toLowerCase()
							.includes(filtro.toLowerCase())
					);
				})
				.includes(true);
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
</script>

<main class="max-h-screen">
	<div class="flex">
		<div class="flex flex-col mt-3">
			<SearchBar filter={filterOffers} {clearFilter} />
			<div class="mt-5 space-y-2 ms-3">
				<p>Filtros:</p>
				<FilterItem
					text="Práctica"
					show={false}
					func={manageFilters}
					filterWords={[
						'internship',
						'practica',
						'trabajo de titulo',
					]}
				/>
				<FilterItem
					text="Desarrollo Web"
					show={false}
					func={manageFilters}
					filterWords={['web', 'desarrollo web']}
				/>
				<FilterItem
					text="IA"
					show={false}
					func={manageFilters}
					filterWords={[
						'machine learning',
						'artificial intelligence',
						'inteligencia artificial',
					]}
				/>
			</div>
		</div>
		<div class="flex flex-col mt-3">
			<div class="grid grid-cols-2 h-[90vh]">
				{#each pagedOffers as offer}
					<OfferCard {offer} />
				{/each}
			</div>
			<Pagination
				{offersPerPage}
				{page}
				{pagedOffers}
				{previousPage}
				{nextPage}
			/>
		</div>
	</div>
</main>

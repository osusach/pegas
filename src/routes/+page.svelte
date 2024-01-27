<script lang="ts">
  import { onMount } from "svelte";
  import type { Offer } from "$lib/utils/types";
  import { offers } from "$lib/utils/store";
  import FilterItem from "$lib/components/filterItem.svelte";
  import OfferCard from "$lib/components/offerCard.svelte";
  import Pagination from "$lib/components/pagination.svelte";
  import SearchBar from "$lib/components/searchBar.svelte";
  import Loading from "$lib/components/loading.svelte";

  let pagedOffers: Offer[] = [];
  let page = 1;
  let offersPerPage = 5;
  const filtros: string[] = [];

  const allJobs = async () => {
    const res = await fetch("/api/jobs");
    const data: Offer[] = await res.json();

    $offers.push(...data);
    pagedOffers = $offers.slice(0, offersPerPage);
  };

  let jobsPromise = allJobs();

  // Función para filtrar las ofertas

  const filterOffers = (e: any) => {
    const text = e.target.value.toLowerCase();
    const filteredOffers = $offers.filter((offer) => {
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
    (<HTMLInputElement>document.getElementById("filter")).value = "";
    pagedOffers = $offers.slice(0, offersPerPage);
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
    const filteredOffers = $offers.filter((offer) => {
      if (filtros.length === 0) {
        return true;
      }
      return filtros
        .map((filtro) => {
          return (
            offer.content.toLowerCase().includes(filtro.toLowerCase()) ||
            offer.id.toLowerCase().includes(filtro.toLowerCase()) ||
            offer.source.toLowerCase().includes(filtro.toLowerCase())
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
    pagedOffers = $offers.slice(start, end);
  };

  const nextPage = () => {
    page++;
    const start = (page - 1) * offersPerPage;
    const end = page * offersPerPage;
    pagedOffers = $offers.slice(start, end);
  };
</script>

<main class="max-h-screen">
  <div class="flex flex-col xl:flex-row justify-center">
    <div class="flex flex-col p-3 min-w-[20rem] gap-4">
      <SearchBar filter={filterOffers} {clearFilter} />
      <details class="flex dropdown md:dropdown-open items-center">
        <summary class="m-1 btn">Filtros</summary>
        <ul class="shadow dropdown-content z-[1] bg-primary rounded-box w-full">
          <li>
            <FilterItem
              text="Práctica"
              show={false}
              func={manageFilters}
              filterWords={["internship", "practica", "trabajo de titulo"]}
            />
          </li>
          <li>
            <FilterItem
              text="Desarrollo Web"
              show={false}
              func={manageFilters}
              filterWords={["web", "desarrollo web"]}
            />
          </li>
          <li>
            <FilterItem
              text="IA"
              show={false}
              func={manageFilters}
              filterWords={[
                "machine learning",
                "artificial intelligence",
                "inteligencia artificial",
              ]}
            />
          </li>
        </ul>
      </details>
    </div>

    <div class="flex flex-col xl:w-3/4 p-4">
      <Pagination
        {offersPerPage}
        {page}
        {pagedOffers}
        {previousPage}
        {nextPage}
      />
      <div class="flex flex-col items-center align-middle gap-1">
        {#await jobsPromise}
          <Loading class="my-[30vh]" />
        {:then}
          {#each pagedOffers as offer}
            <OfferCard {offer} />
          {/each}
        {:catch error}
          <p>error: {error}</p>
        {/await}
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

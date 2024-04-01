<script lang="ts">
  import type { Offer, Filter } from "$lib/utils/types";
  import { offers, lastUpdate, paginationIndex } from "$lib/utils/store";
  import FilterItem from "$lib/components/filterItem.svelte";
  import OfferCard from "$lib/components/offerCard.svelte";
  import Pagination from "$lib/components/pagination.svelte";
  import SearchBar from "$lib/components/searchBar.svelte";
  import Loading from "$lib/components/loading.svelte";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import Filters from "./filtrerList";

  let pagedOffers: Offer[] = [];
  let offersPerPage = 5;
  const filtros: string[] = [];
  const filterItems: Filter[] = Filters;
  const updateTime = 600000;

  const allJobs = async () => {
    const actualTime = new Date().getTime();
    if (!$lastUpdate || (actualTime - $lastUpdate) > updateTime) {
      const res = await fetch("/api/jobs");
      const data: Offer[] = await res.json();
      offers.set([]);
      $offers.push(...data);
      $offers.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      paginationIndex.set(1);
    }
    lastUpdate.set(actualTime);
    const page = $paginationIndex;
    paginationIndex.set(page);
    const start = (page - 1) * offersPerPage;
    const end = page * offersPerPage;
    
    pagedOffers = $offers.slice(start, end);
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
    paginationIndex.set(1);
  };
  
  const clearFilter = () => {
    // Limpiar el input
    (<HTMLInputElement>document.getElementById("filter")).value = "";
      pagedOffers = $offers.slice(0, offersPerPage);
      paginationIndex.set(1);
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
    paginationIndex.set(1);
  };

  // Funciones para la paginación

  const previousPage = () => {
    const page = $paginationIndex - 1;
    paginationIndex.set(page);
    const start = (page - 1) * offersPerPage;
    const end = page * offersPerPage;
    pagedOffers = $offers.slice(start, end);
  };
  
  const nextPage = () => {
    const page = $paginationIndex + 1;
    paginationIndex.set(page);
    const start = (page - 1) * offersPerPage;
    const end = page * offersPerPage;
    pagedOffers = $offers.slice(start, end);
  };
</script>

<main class="flex min-h-screen flex-col justify-center xl:flex-row">
  <div
    class="sm:m-4 flex min-w-[20rem] flex-col gap-4 border border-white bg-base-100/90 p-4"
  >
    <a href="https://www.osusach.com/"
    class="flex flex-col items-center">
      <span class="flex flex-row  self-start gap-1 w-fit">
        <h1 class="text-center text-6xl font-black">Pegas</h1>
        <img class="h-[60px]" src="/shovel.svg" alt="shovel icon">
      </span>
      <span class="flex items-center gap-2 justify-center self-end">
        <img
          class="h-6"
          src="/logo_transparent.svg"
          alt="Open Source Usach logo"
        />
        <h1 class="text-xl font-bold">Open Source USACH</h1>
      </span>
    </a>
    <SearchBar filter={filterOffers} {clearFilter} />
    <ul
      class="menu rounded-box bg-secondary-content menu-horizontal"
    >
      <li class="w-full">
        <details>
          <summary class="font-extrabold">Filtros</summary>
          <ul class="before:m-0 before:p-0 h-[50vh] w-full bg-secondary-content overflow-y-scroll">
            {#each filterItems as item}
              <li class="h-fit">
                <FilterItem
                  text={item.text}
                  show={false}
                  func={manageFilters}
                  filterWords={item.filterWords}
                />
              </li>
            {/each}
          </ul>
        </details>
      </li>
    </ul>
  </div>

  <div class="flex flex-col p-4 xl:w-3/4">
    <Pagination
      class="mb-2"
      {offersPerPage}
      page={$paginationIndex}
      {pagedOffers}
      {previousPage}
      {nextPage}
    />
    <div class="flex flex-col items-center gap-2 align-middle">
      {#await jobsPromise}
        <Loading class="my-[30vh]" />
      {:then}
        {#each pagedOffers as offer}
          <OfferCard {offer} />
        {/each}
      {:catch error}
        <ErrorAlert>
          error: {error}
        </ErrorAlert>
      {/await}
    </div>
    <Pagination
      class="mt-2"
      {offersPerPage}
      page={$paginationIndex}
      {pagedOffers}
      {previousPage}
      {nextPage}
    />
  </div>
</main>

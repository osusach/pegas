<script lang="ts">
  import type { Offer, Filter } from "$lib/utils/types";
  import { offers } from "$lib/utils/store";
  import FilterItem from "$lib/components/filterItem.svelte";
  import OfferCard from "$lib/components/offerCard.svelte";
  import Pagination from "$lib/components/pagination.svelte";
  import SearchBar from "$lib/components/searchBar.svelte";
  import Loading from "$lib/components/loading.svelte";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";

  let pagedOffers: Offer[] = [];
  let page = 1;
  let offersPerPage = 5;
  const filtros: string[] = [];
  const filterItems: Filter[] = [
    {
      text: "IA",
      filterWords: [
        "machine learning",
        "artificial intelligence",
        "inteligencia artificial",
      ],
    },
    {
      text: "Desarrollo Web",
      filterWords: ["web", "desarrollo web", "front-end", "frontend"],
    },
    {
      text: "Práctica",
      filterWords: ["internship", "practica", "trabajo de titulo"],
    },
  ];

  const allJobs = async () => {
    const res = await fetch("/api/jobs");
    const data: Offer[] = await res.json();

    $offers.push(...data);

    $offers.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

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

<main class="flex min-h-screen flex-col justify-center xl:flex-row">
  <div
    class="m-4 flex min-w-[20rem] flex-col gap-4 border border-white bg-base-100/90 p-4"
  >
    <a href="https://www.osusach.com/">
      <h1 class="text-center text-6xl font-black">Oprah</h1>
    </a>
    <SearchBar filter={filterOffers} {clearFilter} />
    <ul
      class="menu rounded-box bg-secondary-content lg:menu-horizontal lg:mb-64"
    >
      <li class="w-full">
        <details open>
          <summary class="font-extrabold">Filtros</summary>
          <ul class="h-fit w-full bg-secondary-content">
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
      {offersPerPage}
      {page}
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
      {offersPerPage}
      {page}
      {pagedOffers}
      {previousPage}
      {nextPage}
    />
  </div>
</main>

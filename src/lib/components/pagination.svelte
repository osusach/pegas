<script lang="ts">
  export let page: number;
  export let offersPerPage: number;
  export let pagedOffers: any[];
  export let previousPage: () => any;
  export let nextPage: () => any;

  const see = (e: Event) => {
    console.log(offersPerPage);
  };
</script>

<div class="join grid grid-cols-2">
  {#if page > 1}
    <button on:click={previousPage} class="btn btn-outline join-item"
      >Anterior</button
    >
  {/if}
  {#if pagedOffers.length === offersPerPage}
    <button on:click={nextPage} class="btn btn-outline join-item col-start-2"
      >Siguiente</button
    >
  {/if}
</div>

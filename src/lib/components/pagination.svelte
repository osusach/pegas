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

<div class="join grid grid-cols-2 {$$props.class}">
  {#if page > 1}
    <button
      on:click={previousPage}
      class="btn btn-outline join-item bg-info-content">Anterior</button
    >
  {/if}
  {#if pagedOffers.length === offersPerPage}
    <button
      on:click={nextPage}
      class="btn btn-outline join-item col-start-2 bg-info-content"
      >Siguiente</button
    >
  {/if}
</div>

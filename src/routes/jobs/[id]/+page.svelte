<script lang="ts">
  import { onMount } from "svelte";
  import type { Offer } from "$lib/utils/types";
  import { viewedOffer } from "$lib/utils/store";

  let offer: Offer;

  onMount(() => {
    offer = $viewedOffer;
  });
</script>

<div class="flex">
  {#if offer}
    <a
      href="/"
      class="w-[6.5vw] border border-white rounded-md hover:bg-gray-600 h-fit py-1 ps-2 m-2"
    >
      volver
    </a>
    <div class="mt-12 ms-1 overflow-scroll max-h-[90vh]">
      <h1 class="text-2xl font-bold">{offer.id}</h1>
      <p>{@html offer.content}</p>
      <p>
        <span class="font-semibold">Fuente: </span>
        {offer.source} <span class="font-semibold">Fecha: </span>
        {offer.date}
      </p>
    </div>
  {:else}
    <p>Cargando...</p>
  {/if}
</div>

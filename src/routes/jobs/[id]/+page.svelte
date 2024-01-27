<script lang="ts">
  import { onMount } from "svelte";
  import type { Offer } from "$lib/utils/types";
  import { viewedOffer } from "$lib/utils/store";
  import { goto } from "$app/navigation";

  let offer: Offer;

  //! no es necesario, no es una promesa, si hay errores descomentar
  // onMount(() => {
  //   offer = $viewedOffer;
  // });   
  offer = $viewedOffer;

</script>


<div class="flex flex-col p-3 gap-5">
    <a
      href="/"
      class="btn btn-md btn-outline"
      aria-label="Volver a la página principal"
    >
      volver
    </a>
      <div class="max-h-[90vh] gap-4">
        <h1 class="text-2xl font-bold">{offer.id}</h1>
        <p>{@html offer.content}</p>
        <p>
          <span class="font-semibold">Fuente: </span>
          {offer.source} <span class="font-semibold">Fecha: </span>
          {offer.date}
        </p>
      </div>
</div>

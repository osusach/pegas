<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Offer } from "$lib/utils/types";
  import { viewedOffer } from "$lib/utils/store";

  export let offer: Offer;

  const verMas = (offer: Offer) => {
    $viewedOffer = offer;
    goto(`/jobs/${formatID(offer.id)}`);
  };

  const formatID = (id: string) => {
    // reemplaza el / por - y lo convierte a minusculas
    return id.replace(/\//g, "-").toLowerCase();
  };

  // Función para procesar el contenido HTML y mostrar solo el texto
  function procesarContenidoHTML(html: string) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText;
  }
</script>

<button
  class="h-fit flex flex-col w-full bg-info-content text-white p-4 rounded-sm hover:bg-stone-700 text-left"
  on:click={() => verMas(offer)}
>
  <div class="flex items-baseline justify-between gap-2">
    <div class="flex lg:gap-5 flex-wrap">
      <h1 class="p-1 pb-2 overflow-hidden overflow-ellipsis font-bold">
        {offer.id}
      </h1>
      <p class="">
        {offer.source}
      </p>
    </div>
    <p class="">
      {offer.date}
    </p>
  </div>
  <div class="divider divider-accent"></div>
  <p class=" overflow-ellipsis p-1 line-clamp-3">
    {procesarContenidoHTML(offer.content)}
  </p>
</button>

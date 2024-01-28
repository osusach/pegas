<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Offer } from "$lib/utils/types";
  import { viewedOffer } from "$lib/utils/store";

  export let offer: Offer;

  const verMas = (offer: Offer) => {
    viewedOffer.set(offer);

    goto(`/jobs/?id=${offer.id}`);
  };

  // Función para procesar el contenido HTML y mostrar solo el texto
  function procesarContenidoHTML(html: string) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText;
  }
</script>

<button
  class="flex h-fit w-full flex-col rounded-sm bg-info-content p-4 text-left text-white hover:bg-stone-700"
  on:click={() => verMas(offer)}
>
  <div class="flex items-baseline justify-between gap-2">
    <div class="flex flex-wrap items-center lg:gap-5">
      <h1 class="overflow-hidden overflow-ellipsis p-1 pb-2 font-bold">
        {offer.id}
      </h1>
      <p class="badge badge-secondary badge-outline">
        {offer.source}
      </p>
    </div>
    <p class="">
      {offer.date}
    </p>
  </div>
  <div class="divider divider-accent"></div>
  <p class=" line-clamp-5 overflow-ellipsis p-1">
    {@html offer.content}
    <!-- {procesarContenidoHTML(offer.content)} -->
  </p>
</button>

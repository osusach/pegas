<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Offer } from "$lib/utils/types";
  import { viewedOffer } from "$lib/utils/store";

  export let offer: Offer;

  const verMas = (offer: Offer) => {
    viewedOffer.set(offer);

    goto(`/jobs/?id=${offer.id}`);
  };

</script>

<button
  class="flex h-fit w-full flex-col rounded-sm bg-info-content border-white border p-4 text-left text-white hover:bg-stone-700"
  on:click={() => verMas(offer)}
>
  <div class="flex items-center justify-between gap-2">
      <h1 class="overflow-hidden overflow-ellipsis p-1 pb-2 font-bold text-3xl">
        {offer.id}
      </h1>
    <span class="font-semibold">
      {offer.date}
    </span>
  </div>
  <div class="divider divider-accent">
      <p class="badge badge-info badge-outline">
        {offer.source}
      </p></div>
  <p class=" line-clamp-5 overflow-ellipsis p-1">
    {@html offer.content}
    <!-- {procesarContenidoHTML(offer.content)} -->
  </p>
</button>

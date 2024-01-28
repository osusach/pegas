<script lang="ts">
  import { onMount } from "svelte";
  import type { Offer } from "$lib/utils/types";
  import { goto } from "$app/navigation";
  import Loading from "$lib/components/loading.svelte";
  import ErrorAlert from "$lib/components/ErrorAlert.svelte";
  import { viewedOffer } from "$lib/utils/store";

  export let data: any;
  let offerPromise: Promise<any> = new Promise(() => {});

  const getJob = async () => {
    if ($viewedOffer.id) return $viewedOffer;
    const res = await fetch("/api/jobs/" + data.id);
    const offer = await res.json();
    if (!offer.error) {
      return offer;
    } else {
      throw new Error(offer.error);
    }
  };

  onMount(async () => {
    offerPromise = getJob();
  });
</script>

<div class="flex h-screen flex-col items-center gap-2 p-3">
  <a
    href="/"
    class="btn btn-outline btn-md w-full bg-secondary-content text-xl"
    aria-label="Volver a la página principal"
  >
    Volver
  </a>

  <div class="flex h-auto flex-grow items-center justify-center">
    {#await offerPromise}
      <Loading />
    {:then offer}
      <div
        class="max-h-[90vh] gap-4 border border-[#b6b6b6] bg-secondary-content p-4"
      >
        <h1 class="text-3xl font-black">{offer.id}</h1>
        <p>{@html offer.content}</p>
        <p>
          <span class="font-semibold">Fuente: </span>
          {offer.source} <span class="font-semibold">Fecha: </span>
          {offer.date}
        </p>
      </div>
    {:catch error}
      <ErrorAlert>Error: {error.message}</ErrorAlert>
    {/await}
  </div>
</div>

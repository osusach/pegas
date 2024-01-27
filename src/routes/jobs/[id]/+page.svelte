<script lang="ts">
  import { onMount } from "svelte";
  import type { Offer } from "$lib/utils/types";
  import { goto } from "$app/navigation";
  import Loading from "$lib/components/loading.svelte";

  export let data: any;
  let offerPromise: Promise<any> = new Promise(() => {});

  const getJob = async () => {
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

<div class="flex flex-col p-3 gap-5 items-center h-screen">
  <a
    href="/"
    class="btn btn-md btn-outline w-full text-xl"
    aria-label="Volver a la página principal"
  >
    Volver
  </a>

  <div class="flex flex-grow items-center justify-center h-auto">
    {#await offerPromise}
      <Loading />
    {:then offer}
      <div class="max-h-[90vh] gap-4">
        <h1 class="text-2xl font-bold">{offer.id}</h1>
        <p>{@html offer.content}</p>
        <p>
          <span class="font-semibold">Fuente: </span>
          {offer.source} <span class="font-semibold">Fecha: </span>
          {offer.date}
        </p>
      </div>
    {:catch error}
      <div role="alert" class="alert alert-error w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>Error: {error.message}</span>
      </div>
    {/await}
  </div>
</div>

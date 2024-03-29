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

    const res = await fetch(`/api/jobs/?id=${data.id}`);
    let offer = await res.json();
    offer = offer[0];

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

<div class="flex min-h-screen flex-col items-center gap-2 p-1 sm:p-10">
  <a
    href="/"
    class="btn btn-outline btn-md w-full bg-secondary-content text-xl"
    aria-label="Volver a la página principal"
  >
    Volver
  </a>

  <div class="flex h-full items-center justify-center w-full ">
    {#await offerPromise}
      <Loading />
    {:then offer}
      <div
        class="h-full w-full gap-4 border border-[#b6b6b6] bg-secondary-content p-4"
      >
        <h1 class="text-3xl font-black">{offer.id}</h1>
        <span class="font-semibold">{offer.date}</span>
        <div class="flex flex-wrap gap-2">
          {#each offer.keywords as keyword}
          <p class="badge badge-success badge-outline">
            {keyword}
          </p>
          {/each}
        </div>
        <div class="divider divider-accent">
          <span class="badge badge-info badge-outline">{offer.source}</span>
        </div>
        <p>{@html offer.content}</p>
      </div>
    {:catch error}
      <ErrorAlert>Error: {error.message}</ErrorAlert>
    {/await}
  </div>
</div>
<script lang="ts">
	import { onMount } from 'svelte';
	import type { Offer } from '$lib/types';

	// Leer el id de la oferta del slug de la URL
    export let id: string;

	let offer: Offer;

	const getOffer = async () => {
		const res = await fetch(`/api/jobs/${id}`);
		const data = await res.json();
		console.log(data);
		offer = data;
	};

	onMount(() => {
		console.log(id);
		// getOffer();
	});
</script>

<div>
	{#if offer}
		<h1>{offer.id}</h1>
		<p>{offer.source}</p>
		<p>{offer.content}</p>
	{:else}
		<p>Cargando...</p>
	{/if}
</div>

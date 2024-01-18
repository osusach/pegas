<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Offer } from '$lib/utils/types';
	import { viewedOffer } from '$lib/utils/store';

	export let offer: Offer;

	const verMas = (offer: Offer) => {
		$viewedOffer = offer;
		goto(`/jobs/${formatID(offer.id)}`);
	};

	const formatID = (id: string) => {
		// reemplaza el / por - y lo convierte a minusculas
		return id.replace(/\//g, '-').toLowerCase();
	};

	// Función para procesar el contenido HTML y mostrar solo el texto
	function procesarContenidoHTML(html: string) {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = html;
		return tempDiv.textContent || tempDiv.innerText;
	}
</script>

<button
	class="h-fit flex flex-col w-[30rem] bg-stone-800 text-white mx-1 p-4 rounded-sm hover:bg-stone-700 text-left"
	on:click={() => verMas(offer)}
>
	<h1
		class="p-1 pb-2 overflow-hidden whitespace-nowrap overflow-ellipsis font-bold"
	>
		{offer.id}
	</h1>
	<p class="overflow-hidden whitespace-nowrap overflow-ellipsis p-1">
		{procesarContenidoHTML(offer.content)}
	</p>
	<p class="p-1 pb-0">
		{offer.source}
	</p>
	<p class="p-1 pt-0">
		{offer.date}
	</p>
</button>

<script lang="ts">
    import { goto } from "$app/navigation";

    const handleClick = () => {
        goto("/jobs");
    };
</script>

<div class="flex flex-col items-center justify-center h-full">
	<h1 class="text-3xl font-bold">Bienvenido a oprah!</h1>
	<p class="mb-2 p-1">Donde todo el trabajo se recolecta</p>
	<button on:click={handleClick} class="bg-orange-400 rounded-md p-2">Ver listado</button>
</div>

<style lang="postcss">
</style>

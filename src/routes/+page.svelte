<script lang="ts">
    import { goto } from "$app/navigation";

    const handleClick = () => {
        goto("/jobs");
    };
</script>

<div class="flex flex-col items-center justify-center h-full">
	<h1 class="text-3xl font-bold">Welcome to oprah!</h1>
	<p>where all jobs arrive</p>
	<button on:click={handleClick} class="bg-orange-400 rounded-md p-2">Get Started</button>
</div>

<style lang="postcss">
</style>

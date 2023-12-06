<script lang="ts">
	import { onMount } from 'svelte';

	type Job = {
		jobs: string[];
	};

	let jobs: Job = {
		jobs: [''],
	};

	const allJobs = async () => {
		const res = await fetch('/api/jobs');
		const data = await res.json();

		jobs = data;
	};

	onMount(() => {
		allJobs();
	});
</script>

<main class="">
	<h1>Hi</h1>
	<div>
		{#each jobs.jobs as job}
			<p>{job}</p>
		{/each}
	</div>
</main>

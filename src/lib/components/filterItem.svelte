<script lang="ts">
	export let text: string;
	export let show: boolean;
	export let func: (text: string[]) => any;
	export let filterWords: string[];

	let filterClass = show ? 'bg-gradient-to-t from-gray-500 to-slate-700' : '';

	const handleClick = () => {
		show = !show;
		filterClass = show ? 'bg-gradient-to-t from-gray-500 to-slate-700' : '';
		sendFilter();
	};

	const sendFilter = () => {
		func(filterWords);
	};
</script>

<div class="my-1 me-3">
	<button on:click={handleClick} class={`${filterClass} w-full rounded-sm`}>
		{text}
	</button>
	<hr class="mt-1 border-slate-500"/>
</div>

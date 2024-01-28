<script lang="ts">
  export let text: string;
  export let show: boolean;
  export let func: (text: string[]) => any;
  export let filterWords: string[];

  const sendFilter = () => {
    func(filterWords);
  };
</script>

<input
  on:click={sendFilter}
  class="btn btn-md w-full bg-secondary-content"
  aria-label={text}
  bind:checked={show}
  type="checkbox"
/>

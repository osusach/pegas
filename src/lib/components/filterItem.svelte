<script lang="ts">
  export let text: string;
  export let show: boolean;
  export let func: (text: string[]) => any;
  export let filterWords: string[];

  const sendFilter = () => {
    func(filterWords);
  };
</script>

<label
  for={"id-" + text}
  class="w-full font-bold hover:text-white"
  class:text-accent-content={show}
  class:bg-accent={show}
  >{text}
  <input
    on:click={sendFilter}
    id={"id-" + text}
    class="collapse-content h-0 w-0 bg-secondary-content text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
    aria-label={text}
    bind:checked={show}
    type="checkbox"
  />
</label>

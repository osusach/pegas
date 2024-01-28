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
class="font-bold w-full"
  class:text-accent-content={show}
  class:bg-accent={show}
  >{text}
  <input
    on:click={sendFilter}
    id={"id-" + text}
    class="collapse-content bg-secondary-content text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content w-0 h-0"
    aria-label={text}
    bind:checked={show}
    type="checkbox"
  />
</label>

<template>
  <div>
    <h2 id="scansummary">Scan Summary</h2>

    <p>
      Nmap {{ item.version }} was initiated at {{ item.startstr }} with these
      arguments:
      <br />
      <i>
        {{ item.args }}
      </i>
      <br />
    </p>

    <p>
      Verbosity:
      {{ verbose[0].item.level }}
      ; Debug level
      {{ debugging[0].item.level }}
    </p>

    <p>{{ runstats[0].finished[0].item.summary }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    },
    runstats: {
      type: Array,
      default: null
    },
    verbose: {
      type: Array,
      default: null
    },
    debugging: {
      type: Array,
      default: null
    }
  }
};
</script>

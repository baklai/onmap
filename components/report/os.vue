<template>
  <div v-if="os">
    <div v-if="os[0].osmatch">
      <h3 v-if="os[0].osmatch.length">Remote Operating System Detection</h3>

      <p v-else>Unable to identify operating system.</p>

      <ul>
        <li v-for="(item, index) in os[0].portused" :key="`portused${index}`">
          Used port:
          <b> {{ item.item.portid }} / {{ item.item.proto }} </b>
          ( <b> {{ item.item.state }} </b> )
        </li>

        <li v-for="(item, index) in os[0].osmatch" :key="`osmatch${index}`">
          OS match: <b> {{ item.item.name }} </b> (
          <b> {{ item.item.accuracy }} % </b> )
        </li>
      </ul>

      <!-- osfingerprint -->
      <report-osfingerprint
        :osfingerprint="os[0].osfingerprint"
        :osmatch="os[0].osmatch"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    os: {
      type: Array,
      default: null
    }
  }
};
</script>

<style scoped>
/* li {
  display: block !important;
} */
</style>

<template>
  <div v-if="hostnames">
    <div v-if="hostnames[0].hostname">
      <div v-if="hostnames[0].hostname[0].item.name != ''">
        <h3>Hostnames</h3>
        <ul>
          <li
            v-for="(item, index) in hostnames[0].hostname"
            :key="`hostnames${index}`"
          >
            {{ item.item.name }}
            ({{ item.item.type }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hostnames: Array,
    default: null
  }
};
</script>

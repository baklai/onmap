<template>
  <div v-if="address">
    <h3>Address</h3>

    <ul>
      <li v-for="(item, index) in address" :key="`address${index}`">
        {{ item.item.addr }} -
        {{ item.item['vendor'] ? item.item.vendor : '' }} ({{
          item.item.addrtype
        }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Array,
      default: null
    }
  }
};
</script>

<style scoped>
li {
  display: block !important;
}
</style>

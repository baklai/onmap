<template>
  <ul v-if="host" id="menu">
    <li>
      <a @click.prevent="scrollTo('scansummary')" style="color: #42a5f5">
        SCAN SUMMARY
      </a>
    </li>

    <li v-for="(item, index) in host" :key="`host${index}`" :value="index">
      |
      <a
        :href="item.address[0].item.addr | hrefHostDots"
        :class="item.status[0].item.state"
        >{{ item | hostName }}</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    host: {
      type: Array,
      default: null
    }
  },

  filters: {
    hostName: function (value) {
      if (value.hostnames) {
        return value.hostnames[0]['hostname']
          ? `${value.hostnames[0].hostname[0].item.name}\u00A0(\u00A0${value.address[0].item.addr}\u00A0)`
          : value.address[0].item.addr;
      } else {
        return value.address[0].item.addr;
      }
    },
    hrefHostDots: function (value) {
      return '#host_' + value.replace(/\./g, '_');
    }
  },
  methods: {
    scrollTo: (href) => {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log('oops');
      }
      return;
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

li {
  display: inline;
}
</style>

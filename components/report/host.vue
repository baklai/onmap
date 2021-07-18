<template>
  <div v-if="host">
    <div
      v-for="(item, index) in host"
      :key="`hostdiv${index}`"
      :id="item.address[0].item.addr | idHostDots"
    >
      <h2
        v-if="item.status[0].item.state === 'up'"
        :class="item.status[0].item.state"
      >
        {{ item | hostTitle }}
      </h2>

      <h2 v-else :class="item.status[0].item.state">
        {{ item | hostTitle }}

        <a
          @click.prevent="hidden = !hidden"
          style="background-color: transparent !important; color: #42a5f5"
        >
          <span>
            <small> (click to expand)</small>
          </span>
        </a>
      </h2>

      <div
        :id="`hostblock_${item.address[0].item.addr}`"
        :class="item.status[0].item.state === 'up' ? 'unhidden' : 'hidden'"
      >
        <!-- address -->
        <report-address :address="item.address" />

        <!-- hostnames -->
        <report-hostnames :hostnames="item.hostnames" />

        <!-- os -->
        <report-os :os="item.os" />

        <br />

        <!-- metrics -->
        <!-- <report-metrics :status="item.status" :distance="item.distance" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    host: {
      type: Array,
      default: null
    }
  },

  data() {
    return {
      hidden: false
    };
  },

  filters: {
    idHostDots: function (value) {
      return 'host_' + value.replace(/\./g, '_');
    },
    hostTitle: function (value) {
      if (value.hostnames) {
        return value.hostnames[0]['hostname']
          ? `${value.address[0].item.addr}\u00A0/\u00A0${value.hostnames[0].hostname[0].item.name}`
          : value.address[0].item.addr;
      } else {
        return value.address[0].item.addr;
      }
    }
  }
};
</script>

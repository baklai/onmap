<template>
  <div v-if="osfingerprint">
    <ul>
      <li>
        OS identified but the fingerprint was requested at scan time.
        <a
          @click.prevent="hidden = !hidden"
          style="background-color: transparent !important; color: #42a5f5"
        >
          <span>
            <small> (click to expand)</small>
          </span>
        </a>
      </li>
    </ul>

    <div :class="hidden ? '' : 'hidden'">
      <ul v-if="!osmatch.length">
        <li>
          Cannot determine exact operating system. Fingerprint provided below.
        </li>
        <li>
          If you know what OS is running on it, see https://nmap.org/submit/
        </li>
      </ul>
      <table v-else cellspacing="1">
        <tr class="head">
          <td>Operating System fingerprint</td>
        </tr>
        <tr>
          <td>
            <pre
              v-for="(item, index) in osfingerprint"
              :key="`osfingerprint${index}`"
              >{{ item.item.fingerprint }}</pre
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    osfingerprint: {
      type: Array,
      default: null
    },
    osmatch: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      hidden: false
    };
  }
};
</script>

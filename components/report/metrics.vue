<template>
  <div v-if="status">
    <a
      @click.prevent="hidden = !hidden"
      style="background-color: transparent !important"
    >
      Misc Metrics
      <span>
        <small> (click to expand)</small>
      </span>
    </a>

    <div>
      <!-- :id="`metrics_${item.address[0].item.addr}`" -->

      <table cellspacing="1">
        <tr class="head">
          <td>Metric</td>
          <td>Value</td>
        </tr>

        <tr>
          <td>Ping Results</td>
          <td>
            {{ status[0].item.reason }}
            {{
              status[0].item.reasonsrc
                ? ` from ${status[0].item.reasonsrc}`
                : ''
            }}
          </td>
        </tr>

        <!-- <xsl:if test="uptime/@seconds != ''">
          <tr>
            <td>System Uptime</td>
            <td>
              <xsl:value-of select="uptime/@seconds" />
              seconds (last reboot:
              <xsl:value-of select="uptime/@lastboot" />
              )
            </td>
          </tr>
        </xsl:if> -->

        {{ distance[0].item.value !='' ? `
        <tr>
          <td>Network Distance</td>
          <td>${ distance[0].item.value } hops</td>
        </tr>
        ` : '' }}

        <tr>
          <td>Network Distance</td>
          <td>
            {{
              distance[0].item.value ? `${distance[0].item.value} hops` : '-'
            }}
          </td>
        </tr>

        <!-- <xsl:if test="distance/@value != ''">
          <tr>
            <td>Network Distance</td>
            <td>
              <xsl:value-of select="distance/@value" />
              hops
            </td>
          </tr>
        </xsl:if> -->

        <xsl:if test="tcpsequence/@index != ''">
          <tr>
            <td>TCP Sequence Prediction</td>
            <td>
              Difficulty=
              <xsl:value-of select="tcpsequence/@index" />
              (
              <xsl:value-of select="tcpsequence/@difficulty" />
              )
            </td>
          </tr>
        </xsl:if>

        <xsl:if test="ipidsequence/@class != ''">
          <tr>
            <td>IP ID Sequence Generation</td>
            <td>
              <xsl:value-of select="ipidsequence/@class" />
            </td>
          </tr>
        </xsl:if>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Array,
      default: null
    },
    distance: {
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

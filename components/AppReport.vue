<template>
  <v-container v-if="report" id="topreport">
    <v-card tile light>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-container>
              <div id="report-container">
                <h1>Scan Report - Scanned at {{ item.startstr }}</h1>

                <report-menu :host="hostsSort" />

                <report-scansummary
                  :item="item"
                  :runstats="runstats"
                  :verbose="verbose"
                  :debugging="debugging"
                />

                <report-host :host="hostsSort" />
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-btn
      v-if="report"
      small
      fab
      dark
      fixed
      bottom
      right
      @click="scrollTo('topreport')"
      color="#37474f"
      class="mr-1"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    report: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      target: null,

      item: null,
      scaninfo: null,
      verbose: null,
      debugging: null,
      taskbegin: null,
      taskend: null,
      hosthint: null,
      host: null,
      prescript: null,
      postscript: null,
      runstats: null
    };
  },

  filters: {
    hrefHostDots: function (value) {
      return '#host_' + value.replace(/\./g, '_');
    },

    idHostDots: function (value) {
      return 'host_' + value.replace(/\./g, '_');
    },

    hostName: function (value) {
      if (value.hostnames) {
        return value.hostnames[0]['hostname']
          ? `${value.hostnames[0].hostname[0].item.name}\u00A0(\u00A0${value.address[0].item.addr}\u00A0)`
          : value.address[0].item.addr;
      } else {
        return value.address[0].item.addr;
      }
    },

    hostTitle: function (value) {
      if (value.hostnames) {
        return value.hostnames[0]['hostname']
          ? `${value.address[0].item.addr}\u00A0/\u00A0${value.hostnames[0].hostname[0].item.name}`
          : value.address[0].item.addr;
      } else {
        return value.address[0].item.addr;
      }
    },

    dateToStr: function (value) {
      return value
        ? new Date(value).toLocaleString('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          })
        : '';
    },

    jsonToStr: function (value) {
      return value ? JSON.stringify(value, null, '\t') : '';
    }
  },

  computed: {
    hostsSort: function () {
      return this.host.sort(function (a, b) {
        let aa = a.address[0].item.addr.split('.');
        let bb = b.address[0].item.addr.split('.');
        for (var i = 0; i < aa.length; i++) {
          if ((aa[i] = parseInt(aa[i])) < (bb[i] = parseInt(bb[i]))) return -1;
          else if (aa[i] > bb[i]) return 1;
        }
        return 0;
      });
    }
  },

  methods: {
    scrollTo: (href) => {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
  },

  watch: {
    report: function () {
      if (this.report) {
        this.target = this.report.target || null;

        this.item = this.report.report.item || null;
        this.scaninfo = this.report.report.scaninfo || null;
        this.verbose = this.report.report.verbose || null;
        this.debugging = this.report.report.debugging || null;
        this.taskbegin = this.report.report.taskbegin || null;
        this.taskend = this.report.report.taskend || null;
        this.hosthint = this.report.report.hosthint || null;
        this.host = this.report.report.host || null;
        this.prescript = this.report.report.prescript || null;
        this.postscript = this.report.report.postscript || null;
        this.runstats = this.report.report.runstats || null;
      }
      console.log(this.report);
    }
  }
};
</script>

<style>
#report-container {
  text-align: left;
  margin: 10px auto;
  width: 90%;
}

#report-container h1 {
  font-family: Verdana, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 14pt;
  color: #ffffff;
  background-color: #2a0d45;
  margin: 10px 0px 0px 0px;
  padding: 5px 4px 5px 4px;
  width: 100%;
  border: 1px solid black;
  text-align: left;
}

#report-container h2 {
  font-family: Verdana, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 11pt;
  color: #000000;
  margin: 30px 0px 0px 0px;
  padding: 4px;
  width: 100%;
  background-color: #f0f8ff;
  text-align: left;
}

#report-container h2.green {
  color: #000000;
  background-color: #ccffcc;
}

#report-container h2.red {
  color: #000000;
  background-color: #ffcccc;
  border-color: #8b0000;
}

#report-container h3 {
  font-family: Verdana, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 10pt;
  color: #000000;
  background-color: #ffffff;
  width: 75%;
  text-align: left;
}

#report-container p {
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  color: #000000;
  background-color: #ffffff;
  width: 75%;
  text-align: left;
}

#report-container p i {
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  color: #000000;
  background-color: #cccccc;
}

#report-container ul {
  font-family: Verdana, Helvetica, sans-serif;

  font-size: 8pt;
  color: #000000;
  background-color: #ffffff;
  text-align: left;
  margin: 30px 0px 0px 0px;
  padding: 0px;
}

#report-container a {
  font-family: Verdana, Helvetica, sans-serif;
  text-decoration: none;
  font-size: 8pt;
  color: #000000;
  font-weight: bold;
  background-color: #ffffff;
  color: #000000;
}

#report-container li a {
  font-family: Verdana, Helvetica, sans-serif;
  text-decoration: none;
  font-size: 10pt;
  color: #000000;
  font-weight: bold;
  background-color: #ffffff;
  color: #000000;
}

#report-container a:hover {
  text-decoration: underline;
}

#report-container a.up {
  color: #006400;
}

#report-container table {
  width: 100%;
  border: 0px;
  color: #000000;
  background-color: #000000;
  margin: 10px;
}

#report-container tr {
  vertical-align: top;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  color: #000000;
  background-color: #ffffff;
}

#report-container tr.head {
  background-color: #e1e1e1;
  color: #000000;
  font-weight: bold;
}

#report-container tr.open {
  background-color: #ccffcc;
  color: #000000;
}

#report-container tr.script {
  background-color: #effff7;
  color: #000000;
}

#report-container tr.filtered {
  background-color: #f2f2f2;
  color: #000000;
}

#report-container tr.closed {
  background-color: #f2f2f2;
  color: #000000;
}

#report-container td {
  padding: 2px !important;
}

#report-container .up {
  color: #000000;
  background-color: #ccffcc;
}

#report-container .down {
  color: #626262;
  background-color: #f2f2f2;
}

#report-container .print_only {
  display: none;
}

#report-container .hidden {
  display: none;
}

#report-container .unhidden {
  display: block;
}
</style>

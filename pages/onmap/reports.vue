<template>
  <v-container>
    <v-row ref="ddd">
      <v-col cols="12">
        <AppReport :report="report" />
      </v-col>
    </v-row>

    <v-card>
      <v-app-bar flat>
        <v-toolbar-title>ONMAP Reports</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar flat dense color="transparent">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs">
                <v-icon> mdi-console </v-icon>
              </v-btn>
            </template>
            <span> Rescan targets </span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs">
                <v-icon> mdi-content-save-all-outline </v-icon>
              </v-btn>
            </template>
            <span> Save reports </span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs" @click="selectedReport = []">
                <v-icon> mdi-close-box-multiple-outline </v-icon>
              </v-btn>
            </template>
            <span> Cancel selected </span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs">
                <v-icon> mdi-trash-can-outline </v-icon>
              </v-btn>
            </template>
            <span> Delete reports </span>
          </v-tooltip>
        </v-toolbar>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              icon
              small
              v-on="on"
              v-bind="attrs"
              @click="getReports"
              class="mx-2"
            >
              <v-icon> mdi-cached </v-icon>
            </v-btn>
          </template>
          <span> Update list </span>
        </v-tooltip>
      </v-app-bar>

      <v-card-title>
        ONMAP Reports
        <v-toolbar flat dense color="transparent">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs">
                <v-icon> mdi-console </v-icon>
              </v-btn>
            </template>
            <span> Rescan targets </span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs">
                <v-icon> mdi-content-save-all-outline </v-icon>
              </v-btn>
            </template>
            <span> Save reports </span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs" @click="selectedReport = []">
                <v-icon> mdi-close-box-multiple-outline </v-icon>
              </v-btn>
            </template>
            <span> Cancel selected </span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs">
                <v-icon> mdi-trash-can-outline </v-icon>
              </v-btn>
            </template>
            <span> Delete reports </span>
          </v-tooltip>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-text-field
          clearable
          single-line
          hide-details
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search report"
          class="ma-0"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        dense
        show-select
        v-model="selectedReport"
        item-key="_id"
        :headers="headers"
        :items="reports"
        :search="search"
        :items-per-page="5"
        :footer-props="{
          itemsPerPageOptions: [5, 10, 25, 50, -1],
          itemsPerPageText: 'Rows per reports:',

          showFirstLastPage: true,
          showCurrentPage: true
        }"
        loading-text="Loading... Please wait"
        no-data-text="No data available"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-list-item class="pr-0">
            <v-btn
              icon
              small
              color="green lighten-1"
              @click="getReportById(item._id)"
            >
              <v-icon small>mdi-eye-outline</v-icon>
            </v-btn>
            <v-btn
              icon
              small
              color="blue lighten-1"
              @click="saveReport(item._id)"
            >
              <v-icon small>mdi-content-save-outline</v-icon>
            </v-btn>
            <v-btn
              icon
              small
              color="red lighten-1"
              @click="deleteReport(item._id)"
            >
              <v-icon small>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-list-item>
        </template>

        <template v-slot:[`item.os`]="{}">
          <v-icon>mdi-desktop-classic</v-icon>
        </template>

        <template v-slot:[`item.target`]="{ item }">
          <v-list-item dense class="pl-0 pr-0">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.target }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <small> {{ item.updatedAt | dateToStr }} </small>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],

  layout: 'application',

  async asyncData({ $axios }) {
    const { data: reports } = await $axios.get('reports', {});

    console.log(reports);

    const { data: profiles } = await $axios.get('profiles', {});
    return { reports, profiles };
  },

  data() {
    return {
      miniDrawer: null,
      leftDrawer: null,
      rightDrawer: false,

      report: null,

      search: '',
      selectedReport: [],
      headers: [
        {
          text: 'OS',
          value: 'os',
          align: 'center',
          filterable: false,
          sortable: false
        },
        {
          text: 'Report',
          value: 'target',
          filterable: true,
          sortable: false
        },
        {
          text: '',
          value: 'actions',
          filterable: false,
          sortable: false
        }
      ],

      target: null,
      targetRules: [
        (v) => !!v || 'IP-address is required',
        (v) =>
          // this.hostname.test(v) ||
          this.IPv4.test(v) ||
          this.IPv4Range.test(v) ||
          this.IPv4CIDR.test(v) ||
          'Examples: example.com (host), 192.168.2.10 (single), 10.0.10.5-20 (range), 10.0.2.0/24 (CIDR)'
      ],

      flags: ['-Pn'],

      viewReport: false,

      command: null,
      commandPrefix: null,

      profile: {
        title: 'Select profile',
        flags: []
      },

      stateSelect: [],
      states: ['-Pn', '-O', '-P443,80']
    };
  },

  filters: {
    titleReport: function (value) {
      if (value) {
        return `ONMAP Report - ${value.target}`;
      } else {
        return 'Online Network Mapper';
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
    hostname() {
      return this.$store.state.regex.hostname;
    },
    IPv4() {
      return this.$store.state.regex.IPv4;
    },
    IPv4Range() {
      return this.$store.state.regex.IPv4Range;
    },
    IPv4CIDR() {
      return this.$store.state.regex.IPv4CIDR;
    }
  },

  methods: {
    async onScan() {
      if (this.$refs.formScan.validate()) {
        try {
          this.$toast.success(`Scan target ${this.target} run!`);

          const { data: report } = await this.$axios.post('nmap', {
            target: this.target,
            flags: this.flags
          });
          //  this.report = report;
        } catch (err) {
          this.$toast.error(`Scan target ${this.target} error!`);
        }
      }
    },

    async getReports() {
      try {
        const { data: reports } = await this.$axios.get('reports', {});
        this.reports = reports;
        this.$toast.success(`The list of reports has been updated!`);
      } catch (err) {
        this.$toast.error('Oops! An unexpected error has occurred!');
      }
    },

    async getReportById(id) {
      try {
        const { data: report } = await this.$axios.get(`reports/${id}`);
        this.report = report;

        this.$toast.success(
          `Report ${this.report.target} received successfully!`
        );
      } catch (err) {
        this.$toast.error('Oops! An unexpected error has occurred!');
      }
    },

    async deleteReport(id) {
      try {
        await this.$axios.delete(`reports/${id}`);
        this.$toast.success('Report delete!');
        await this.getReports();
        this.report = null;
      } catch (err) {
        this.$toast.error('Oops! An unexpected error has occurred!');
      }
    },

    async saveReport(id) {
      try {
        // const { data: report } = await this.$axios.get(`nmap/reports/${id}`);

        if (process.browser) {
          const html2pdf = require('html2pdf.js');

          const element = document.getElementById('report-container');

          console.log(element);

          await html2pdf(element, {
            margin: 1,

            // filename: `${report.target}.pdf`,
            filename: `test.pdf`,
            jsPDF: {
              orientation: 'portrait',
              format: 'a4',
              floatPrecision: 16
            }
          });

          this.$toast.success(`Report ${report.target} saved successfully!`);
        }
      } catch (err) {
        this.$toast.error('Oops! An unexpected error has occurred!');
      }
    },

    closeReport() {
      this.report = null;
    },

    reset() {
      this.$refs.formScan.reset();
    },

    validate() {
      this.$refs.formScan.validate();
    },

    resetValidation() {
      this.$refs.formScan.resetValidation();
    },

    setCommand() {
      this.command = `nmap ${this.profile.flags.join(' ')}`;
    },

    onClean() {
      this.reset();
      this.resetValidation();
    },

    onSaveProfile() {
      alert('dfgmjhdkjh');
    }
  }
};
</script>

<style>
/* .v-data-table {
  background-color: transparent !important;
} */

.v-data-table th,
td {
  padding: 0 8px !important;
}

.v-data-footer {
  justify-content: center !important;
}
</style>

<template>
  <v-container>
    <v-sheet width="100%" color="transparent">
      <v-list three-line>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon large> mdi-lan </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="body-1 text-uppercase font-weight-bold">
              Scan service
            </v-list-item-title>
            <v-list-item-subtitle>
              Service for checking the integrity and quality of connections in
              networks based on TCP/IP.
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              icon
              fab
              small
              class="mx-2"
              @click.stop="rightDrawer = !rightDrawer"
            >
              <v-icon>
                mdi-{{ `chevron-${rightDrawer ? 'right' : 'left'}` }}
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-sheet>

    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-form ref="formScan" lazy-validation @submit.prevent="onScan">
            <v-text-field
              required
              clearable
              persistent-hint
              type="text"
              name="target"
              label="Scan target"
              prepend-icon="mdi-ip-network-outline"
              hint="Examples: example.com (host), 192.168.2.10 (single), 10.0.10.5-20 (range), 10.0.2.0/24 (CIDR)"
              v-model.trim="target"
              :rules="targetRules"
              @click:clear="onClean"
            />

            <v-text-field
              required
              clearable
              persistent-hint
              :prefix="commandPrefix"
              type="text"
              name="command"
              label="Scan command"
              prepend-icon="mdi-console"
              append-icon="mdi-content-save-outline"
              hint="Default command: nmap -P4"
              v-model.trim="command"
              @click:append="onSaveProfile"
            />
          </v-form>

          <v-btn block outlined elevation="2" @click="onScan" class="my-5">
            Scan
          </v-btn>

          <v-select
            single-line
            return-object
            persistent-hint
            item-text="title"
            item-value="command"
            label="Scan profile"
            prepend-icon="mdi-format-list-text"
            v-model="profile"
            :items="profiles"
            :hint="`${profile.title} (nmap ${profile.flags.join(' ')})`"
            @change="setCommand"
          >
            <template slot="selection" slot-scope="{ item }">
              {{ item.title }}
            </template>

            <template slot="item" slot-scope="{ item }">
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <small>
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 300px"
                    >
                      {{ item.ports }} {{ item.flags.join(' ') }}
                    </span>
                  </small>
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-select>

          <v-select
            chips
            v-model="stateSelect"
            :items="states"
            :menu-props="{ maxHeight: '400' }"
            label="Scan options"
            multiple
            prepend-icon="mdi-tune"
            hint="Pick your favorite states"
            persistent-hint
          ></v-select>

          <v-subheader>REPORTS</v-subheader>

          <v-switch
            persistent-hint
            v-model="viewReport"
            class="ml-8"
            hint="ksdfjgkd32452354234jgk"
            :label="`${
              viewReport
                ? 'Open report after scan'
                : 'Don\'t open report after scan'
            }`"
          ></v-switch>

          <v-switch
            persistent-hint
            v-model="viewReport"
            class="ml-8"
            hint="ksdfjgkd32452354234jgk"
            :label="`${
              viewReport
                ? 'Групировка в один отчет'
                : 'Don\'t open report after scan'
            }`"
          ></v-switch>

          <v-switch
            persistent-hint
            v-model="viewReport"
            class="ml-8"
            hint="ksdfjgfdgh dfghkdjgk"
            :label="`${viewReport ? 'Private scan' : 'Public scan'}`"
          ></v-switch>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],

  layout: 'apps',

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
      rightDrawer: true,

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

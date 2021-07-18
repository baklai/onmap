<template>
  <v-container>
    <v-app-bar dark clipped-right dense flat color="#37474f">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            fab
            small
            v-bind="attrs"
            v-on="on"
            class="mr-2"
            @click.stop="miniDrawer = !miniDrawer"
          >
            <v-icon
              >mdi-{{ `chevron-${miniDrawer ? 'right' : 'left'}` }}</v-icon
            >
          </v-btn>
        </template>
        <span> {{ `${miniDrawer ? 'Open reports' : 'Close reports'}` }} </span>
      </v-tooltip>

      <v-toolbar-title>
        {{ report | titleReport }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom v-if="report">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            fab
            small
            v-on="on"
            v-bind="attrs"
            color="blue lighten-1"
            @click="saveReport(report._id)"
          >
            <v-icon small> mdi-content-save-outline </v-icon>
          </v-btn>
        </template>
        <span> Save report </span>
      </v-tooltip>

      <v-tooltip bottom v-if="report">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            icon
            small
            v-on="on"
            v-bind="attrs"
            color="red lighten-1"
            @click="deleteReport(report._id)"
          >
            <v-icon small> mdi-trash-can-outline </v-icon>
          </v-btn>
        </template>
        <span> Delete report </span>
      </v-tooltip>

      <v-tooltip bottom v-if="report">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            icon
            small
            v-on="on"
            v-bind="attrs"
            color="green lighten-1"
            @click="closeReport(report._id)"
          >
            <v-icon> mdi-close-box-outline </v-icon>
          </v-btn>
        </template>
        <span> Close report </span>
      </v-tooltip>

      <v-divider v-if="report" dark vertical inset class="mx-2"></v-divider>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            icon
            small
            v-bind="attrs"
            v-on="on"
            @click.stop="rightDrawer = !rightDrawer"
          >
            <v-icon> mdi-menu </v-icon>
          </v-btn>
        </template>
        <span> Scan menu </span>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer
      app
      permanent
      v-model="leftDrawer"
      :mini-variant.sync="miniDrawer"
      width="430"
    >
      <AppSidebar :app="false" :absolute="true" />

      <v-sheet width="100%" color="transparent">
        <v-list three-line class="pl-14">
          <v-list-item>
            <v-list-item-avatar>
              <v-icon large> mdi-clipboard-list-outline </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="body-1 text-uppercase font-weight-bold">
                List of reports
              </v-list-item-title>
              <v-list-item-subtitle>
                List of reports from scan report storage
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
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
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-sheet>

      <v-list class="pl-14" dense flat>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              clearable
              single-line
              hide-details
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search report"
              class="ma-0"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list class="pl-14" dense flat>
        <v-list-item v-if="selectedReport.length">
          <v-list-item-content>
            <v-toolbar flat dense color="transparent">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-on="on" v-bind="attrs">
                    <v-icon> mdi-console </v-icon>
                  </v-btn>
                </template>
                <span> Rescan targets </span>
              </v-tooltip>
              <v-spacer />
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-on="on" v-bind="attrs">
                    <v-icon> mdi-content-save-all-outline </v-icon>
                  </v-btn>
                </template>
                <span> Save reports </span>
              </v-tooltip>
              <v-spacer />
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-on="on"
                    v-bind="attrs"
                    @click="selectedReport = []"
                  >
                    <v-icon> mdi-close-box-multiple-outline </v-icon>
                  </v-btn>
                </template>
                <span> Cancel selected </span>
              </v-tooltip>
              <v-spacer />
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-on="on" v-bind="attrs">
                    <v-icon> mdi-trash-can-outline </v-icon>
                  </v-btn>
                </template>
                <span> Delete reports </span>
              </v-tooltip>
            </v-toolbar>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
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
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-row ref="ddd">
      <v-col cols="12">
        <AppReport :report="report" />
      </v-col>
    </v-row>

    <v-navigation-drawer v-model="rightDrawer" app temporary right width="400">
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
    </v-navigation-drawer>

    <v-footer absolute padless fixed color="transparent">
      <v-col cols="12" class="text-center">
        <span>ONMAP &copy; {{ new Date().getFullYear() }}</span>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],

  async asyncData({ $axios }) {
    const { data: reports } = await $axios.get('reports', {});
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
.v-data-table {
  background-color: transparent !important;
}

.v-data-table th,
td {
  padding: 0 8px !important;
}

.v-data-footer {
  justify-content: center !important;
}
</style>

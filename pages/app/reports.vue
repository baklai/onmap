<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- <AppReport :report="report" /> -->
      </v-col>
    </v-row>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="reports"
        :search="search"
        :items-per-page="10"
        :footer-props="{
          itemsPerPageOptions: [5, 10, 15, -1],
          itemsPerPageText: 'Rows per reports:',
          showFirstLastPage: true,
          showCurrentPage: true
        }"
        :loading="false"
        loading-text="Loading... Please wait"
        no-data-text="No data available"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-icon large left> mdi-clipboard-list-outline </v-icon>
            <v-toolbar-title> List of reports </v-toolbar-title>
            <v-spacer />

            <v-responsive max-width="260" class="mr-2">
              <v-text-field
                flat
                dense
                rounded
                clearable
                hide-details
                solo-inverted
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search in reports"
                class="ma-0"
              />
            </v-responsive>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
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
          </v-toolbar>
        </template>
        <!--
        <template v-slot:[`item.name`]="{ item }">
          <v-icon left> mdi-account-circle-outline </v-icon>
          <span> {{ item.name }} </span>
        </template>

        <template v-slot:[`item.email`]="{ item }">
          <v-icon left> mdi-email-outline </v-icon>
          <span> {{ item.email }} </span>
        </template>

        <template v-slot:[`item.login`]="{ item }">
          <v-icon left> mdi-account-outline </v-icon>
          <span> {{ item.login }} </span>
        </template> -->

        <!-- <template v-slot:[`item.role`]="{ item }">
          <v-chip
            outlined
            small
            :color="item.role === 'admin' ? 'success' : 'default'"
          >
            {{ item.role }}
          </v-chip>
        </template> -->

        <!--
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            icon
            small
            class="mr-2"
            color="green lighten-1"
            @click="editItem(item.id)"
          >
            <v-icon small> mdi-eye-outline </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2"
            color="blue lighten-1"
            @click="editItem(item.id)"
          >
            <v-icon small> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2"
            color="red lighten-1"
            @click="deleteItem(item.id)"
          >
            <v-icon small> mdi-trash-can-outline </v-icon>
          </v-btn>
        </template> -->
      </v-data-table>
    </v-card>

    <!-- <v-card>
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
    </v-card> -->
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],

  layout: 'apps',

  async asyncData({ store }) {
    const reports = await store.dispatch('rest-api/reports/findAll');
    return { reports };
  },

  data() {
    return {
      search: null,
      report: null,

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

      viewReport: false,

      command: null,
      commandPrefix: null
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

  methods: {
    async getReports() {
      this.reports = await this.$store.dispatch('rest-api/reports/findAll');
      this.$toast.success('The list of reports has been updated!');
    },

    async getReportById(id) {
      this.report = await this.$store.dispatch('rest-api/reports/findOne', {
        id
      });
      this.$toast.success(
        `Report ${this.report.target} received successfully!`
      );
    },

    async deleteReport(id) {
      await this.$store.dispatch('rest-api/reports/removeOne', {
        id
      });
      this.report = null;
      this.$toast.success('Report delete!');
      await this.getReports();
    },

    closeReport() {
      this.report = null;
    }
  }
};
</script>

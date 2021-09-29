<template>
  <v-container>
    <v-card>
      <v-data-table
        item-key="id"
        show-expand
        single-expand
        :expanded.sync="expanded"
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
            <v-icon large left> mdi-skull-scan-outline </v-icon>
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

        <template v-slot:[`item.host`]="{ item }">
          <v-icon left> mdi-ip-network-outline </v-icon>
          <span>
            <strong> {{ item.host }} </strong>
          </span>
        </template>

        <template v-slot:[`item.users`]="{ item }">
          <v-chip outlined small color="success">
            {{ item.users.length }}
          </v-chip>
        </template>

        <template v-slot:[`item.products`]="{ item }">
          <v-chip outlined small color="success">
            {{ item.products.length }}
          </v-chip>
        </template>

        <template v-slot:[`item.smbshare`]="{ item }">
          <v-chip outlined small color="success">
            {{ item.smbshare.length }}
          </v-chip>
        </template>

        <template v-slot:[`item.updated`]="{ item }">
          <v-icon left> mdi-clock-outline </v-icon>
          <span>
            {{ item.updated | dateToStr }}
          </span>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            icon
            small
            class="mr-2"
            color="green lighten-1"
            @click="showReport(item.id)"
          >
            <v-icon small> mdi-eye-outline </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2"
            color="blue lighten-1"
            @click="saveReport(item.id)"
          >
            <v-icon small> mdi-content-save-outline </v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="mr-2"
            color="red lighten-1"
            @click="deleteReport(item.id)"
          >
            <v-icon small> mdi-trash-can-outline </v-icon>
          </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" style="max-height: 50px">
            <p>HOST IP - {{ item.host }}</p>
            <table border="1" class="mt-4">
              <caption>
                <strong>Локальные пользователи</strong>
              </caption>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>SID</th>
                <th>Enabled</th>
              </tr>
              <tr v-for="user in item.users" :key="user.name">
                <td>{{ user.Name }}</td>
                <td>{{ user.Description }}</td>
                <td>{{ user.SID.Value }}</td>
                <td>{{ user.Enabled }}</td>
              </tr>
            </table>
            <table border="1" class="mt-4">
              <caption>
                <strong>Общие ресурсы</strong>
              </caption>
              <tr>
                <th>Name</th>
                <th>ScopeName</th>
                <th>Path</th>
                <th>Description</th>
              </tr>
              <tr v-for="smbshare in item.smbshare" :key="smbshare.name">
                <td>{{ smbshare.Name }}</td>
                <td>{{ smbshare.ScopeName }}</td>
                <td>{{ smbshare.Path }}</td>
                <td>{{ smbshare.Description }}</td>
              </tr>
            </table>
            <table border="1" class="mt-4">
              <caption>
                <strong>Программы и компоненты</strong>
              </caption>
              <tr>
                <th>Name</th>
                <th>ScopeName</th>
                <th>Path</th>
                <th>Description</th>
              </tr>
              <tr v-for="products in item.products" :key="products.name">
                <td>{{ products.Name }}</td>
                <td>{{ products.Vendor }}</td>
                <td>{{ products.Version }}</td>
                <td>{{ products.Caption }}</td>
              </tr>
            </table>
          </td>
        </template>
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
    const reports = await store.dispatch('rest-api/collector/findAll');
    return { reports };
  },

  data() {
    return {
      search: null,
      report: null,
      expanded: [],
      headers: [
        {
          text: 'Host',
          value: 'host',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: 'Users',
          value: 'users',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: 'Products',
          value: 'products',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: 'SMB Share',
          value: 'smbshare',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: 'Date time',
          value: 'updated',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: '',
          value: 'actions',
          filterable: false,
          sortable: false
        }
      ]
    };
  },

  filters: {
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
      this.reports = await this.$store.dispatch('rest-api/collector/findAll');
      this.$toast.success('The list of reports has been updated!');
    },

    async getReportById(id) {
      this.report = await this.$store.dispatch('rest-api/collector/findOne', {
        id
      });
      this.$toast.success(
        `Report ${this.report.target} received successfully!`
      );
    },

    async deleteReport(id) {
      await this.$store.dispatch('rest-api/collector/removeOne', {
        id
      });
      this.$toast.success('Report delete!');
      await this.getReports();
    },

    showReport(id) {},
    saveReport(id) {},
    deleteReport(id) {}
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border: 0px;
}

tr {
  vertical-align: top;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
}

tr.head {
  font-weight: bold;
}

td {
  padding: 2px;
}
</style>

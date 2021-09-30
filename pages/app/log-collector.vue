<template>
  <v-container fluid>
    <v-card>
      <v-data-table
        item-key="id"
        show-expand
        single-expand
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
        @item-expanded="getReportById"
      >
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
                label="Search IP-Address"
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

        <template v-slot:[`item.os.CsName`]="{ item }">
          {{ item.os.CsName.toLowerCase() }}
        </template>

        <template v-slot:[`item.usersCount`]="{ item }">
          <v-chip outlined small color="dafault">
            {{ item.usersCount }}
          </v-chip>
        </template>

        <template v-slot:[`item.productsCount`]="{ item }">
          <v-chip outlined small color="dafault">
            {{ item.productsCount }}
          </v-chip>
        </template>

        <template v-slot:[`item.sharesCount`]="{ item }">
          <v-chip outlined small color="dafault">
            {{ item.sharesCount }}
          </v-chip>
        </template>

        <template v-slot:[`item.updated`]="{ item }">
          {{ item.updated | dateToStr }}
        </template>

        <!-- <template v-slot:[`item.data-table-expand`]="{ expand, isExpanded }">
          <v-btn
            icon
            small
            @click="expand(!isExpanded)"
            :color="isExpanded ? 'blue lighten-1' : 'green lighten-1'"
          >
            <v-icon>
              {{ isExpanded ? 'mdi-file-eye' : 'mdi-file-eye-outline' }}
            </v-icon>
          </v-btn>
        </template> -->

        <template v-slot:[`item.actions`]="{ item }">
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

        <template v-slot:expanded-item="{ headers }">
          <td :colspan="headers.length" style="max-height: 50px" v-if="report">
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
              <tr v-for="user in report.users" :key="user.name">
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
              <tr v-for="share in report.shares" :key="share.name">
                <td>{{ share.Name }}</td>
                <td>{{ share.ScopeName }}</td>
                <td>{{ share.Path }}</td>
                <td>{{ share.Description }}</td>
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
              <tr v-for="product in report.products" :key="product.name">
                <td>{{ product.Name }}</td>
                <td>{{ product.Vendor }}</td>
                <td>{{ product.Version }}</td>
                <td>{{ product.Caption }}</td>
              </tr>
            </table>
          </td>
        </template>
      </v-data-table>
    </v-card>
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
        { text: '', value: 'data-table-expand' },
        {
          text: 'Computer name',
          value: 'os.CsName',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: 'IP-Address',
          value: 'host',
          align: 'start',
          filterable: true,
          sortable: true
        },
        {
          text: 'Teg',
          value: '',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: 'Last connection',
          value: 'updated',
          align: 'start',
          filterable: false,
          sortable: true
        },
        {
          text: 'OS name',
          value: 'os.OsName',
          align: 'start',
          filterable: false,
          sortable: true
        },
        {
          text: 'OS platform',
          value: 'os.OsArchitecture',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: 'OS version',
          value: 'os.OsVersion',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: 'Warnings',
          value: '',
          align: 'start',
          filterable: false,
          sortable: false
        },
        {
          text: 'Users',
          value: 'usersCount',
          align: 'start',
          filterable: false,
          sortable: true
        },
        {
          text: 'Products',
          value: 'productsCount',
          align: 'start',
          filterable: false,
          sortable: true
        },
        {
          text: 'SMB Share',
          value: 'sharesCount',
          align: 'start',
          filterable: false,
          sortable: true
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
      return value ? new Date(value).toLocaleString() : '-';
    },

    jsonToStr: function (value) {
      return value ? JSON.stringify(value, null, '\t') : '-';
    }
  },

  methods: {
    async getReports() {
      this.reports = await this.$store.dispatch('rest-api/collector/findAll');
      this.$toast.success('The list of reports has been updated!');
    },

    async getReportById({ item }) {
      this.report = null;
      this.report = await this.$store.dispatch('rest-api/collector/findOne', {
        id: item.id
      });
      this.$toast.success(`Report ${this.report.host} received successfully!`);
    },

    saveReport(id) {},

    async deleteReport(id) {
      await this.$store.dispatch('rest-api/collector/removeOne', {
        id
      });
      this.$toast.success('Report delete!');
      await this.getReports();
    }
  }
};
</script>

<style scoped>
.v-data-table.v-data-table.v-data-table >>> td {
  font-size: 0.7rem !important;
}

table {
  width: 100%;
  border: 0px;
}

tr {
  vertical-align: top;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
}

td {
  padding: 2px;
}
</style>

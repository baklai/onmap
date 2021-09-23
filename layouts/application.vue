<template>
  <v-app v-if="$nuxt.$loading">
    <NavAppDrawer :drawer="drawer" :pages="subPages" />
    <NavAppBar :drawer="drawer" />
    <v-main>
      {{ page() }}
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      currentPage: null,
      subPages: [
        {
          href: '/onmap/reports',
          icon: 'mdi-clipboard-list-outline',
          title: 'Reports',
          subtitle: 'List of reports from storage'
        },
        {
          href: '/onmap/scaner',
          icon: 'mdi-lan',
          title: 'Scaner',
          subtitle: 'Scan service'
        },
        {
          href: '/onmap/ping-icmp',
          icon: 'mdi-lan-pending',
          title: 'ICMP Ping',
          subtitle: 'Allow notifications'
        }
      ]
    };
  },
  computed: {
    page() {
      console.log(this.$route);
      return this.$route.name;
    }
  }
  // mounted() {
  //   this.currentPage = this.subPages.find(
  //     (item) => item.href === this.$route.fullPath
  //   );
  // }
};
</script>

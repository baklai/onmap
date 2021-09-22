<template>
  <v-app>
    <!-- <NavAppDrawer :drawer="drawer" :pages="subPages" />
    <NavAppBar :drawer="drawer" /> -->
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  async fetch() {
    const posts = await this.$content().sortBy('title').fetch();

    console.log(posts);
  },

  data() {
    return {
      drawer: null,
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
  }
};
</script>

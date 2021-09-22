<template>
  <v-app v-if="$nuxt.$loading">
    <NavAppDrawer :drawer="drawer" :pages="subPages" />
    <NavAppBar :drawer="drawer" />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      subPages: [
        {
          href: '/admin/dashboard',
          icon: 'mdi-view-dashboard-outline',
          title: 'Dashboard',
          subtitle: 'List of reports from storage'
        },
        {
          href: '/admin/options',
          icon: 'mdi-cog-outline',
          title: 'Options',
          subtitle: 'Scan service'
        },
        {
          href: '/admin/users',
          icon: 'mdi-account-supervisor-outline',
          title: 'Users',
          subtitle: 'Allow notifications'
        }
      ]
    };
  }
};
</script>

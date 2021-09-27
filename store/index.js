import { config } from '@/package.json';

export const state = () => ({
  sidebar: null,

  author: {
    name: config.author.name,
    email: config.author.email,
    url: config.author.url
  },

  social: {
    facebook: config.author.social.facebook
      ? {
          title: 'Facebook',
          icon: 'mdi-facebook',
          href: config.author.social.facebook
        }
      : null,
    github: config.author.social.github
      ? {
          title: 'Github',
          icon: 'mdi-github',
          href: config.author.social.github
        }
      : null,
    linkedin: config.author.social.linkedin
      ? {
          title: 'Linkedin',
          icon: 'mdi-linkedin',
          href: config.author.social.linkedin
        }
      : null
  },

  core: {
    home: {
      href: '/',
      icon: 'mdi-view-dashboard-outline',
      title: 'Dashboard',
      subtitle: 'List of reports from storage'
    },
    docs: {
      href: '/docs',
      icon: 'mdi-view-dashboard-outline',
      title: 'Dashboard',
      subtitle: 'List of reports from storage'
    },
    contacts: {
      href: '/contacts',
      icon: 'mdi-view-dashboard-outline',
      title: 'Dashboard',
      subtitle: 'List of reports from storage'
    },
    signin: {
      href: '/board',
      icon: 'mdi-view-dashboard-outline',
      title: 'Dashboard',
      subtitle: 'List of reports from storage'
    },
    signup: {
      href: '/board',
      icon: 'mdi-view-dashboard-outline',
      title: 'Dashboard',
      subtitle: 'List of reports from storage'
    },

    links: [
      {
        href: '/core/dashboard',
        icon: 'mdi-view-dashboard-outline',
        title: 'Dashboard',
        subtitle: 'List of reports from storage'
      },
      {
        href: '/core/options',
        icon: 'mdi-cog-outline',
        title: 'Options',
        subtitle: 'Scan service'
      },
      {
        href: '/core/users',
        icon: 'mdi-account-supervisor-outline',
        title: 'Users',
        subtitle: 'Allow notifications'
      }
    ]
  },

  app: {
    name: config.app.name,
    short_name: config.app.short_name,
    description: config.app.description,

    links: [
      {
        href: '/app/scaner',
        icon: 'mdi-lan',
        title: 'Scan service',
        subtitle:
          'Service for checking the integrity and quality of connections in networks based on TCP/IP. '
      },
      {
        href: '/app/ping-icmp',
        icon: 'mdi-lan-pending',
        title: 'ICMP Ping',
        subtitle: 'Allow notifications'
      },
      {
        href: '/app/reports',
        icon: 'mdi-clipboard-list-outline',
        title: 'Reports',
        subtitle: 'List of reports from storage'
      }
    ]
  }
});

export const getters = {
  copyright: (state) => {
    return `Copyright © ${new Date().getFullYear()} ${
      state.author.name
    }. All rights reserved.`;
  }
};

export const mutations = {
  sidebar(state, val) {
    state.sidebar = val;
  }
};

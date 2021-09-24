import { config } from '@/package.json';

export const state = () => ({
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

    board: [
      {
        href: '/board',
        icon: 'mdi-view-dashboard-outline',
        title: 'Dashboard',
        subtitle: 'List of reports from storage'
      },
      {
        href: '/board/options',
        icon: 'mdi-cog-outline',
        title: 'Options',
        subtitle: 'Scan service'
      },
      {
        href: '/board/users',
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
        href: '/app/reports',
        icon: 'mdi-clipboard-list-outline',
        title: 'Reports',
        subtitle: 'List of reports from storage'
      },
      {
        href: '/app/scaner',
        icon: 'mdi-lan',
        title: 'Scaner',
        subtitle: 'Scan service'
      },
      {
        href: '/app/ping-icmp',
        icon: 'mdi-lan-pending',
        title: 'ICMP Ping',
        subtitle: 'Allow notifications'
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

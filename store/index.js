import { author, config } from '~/package.json';

export const state = () => ({
  name: 'WEBNMAP',
  version: process.env.npm_package_version || '',
  description: 'Web utility for network discovery and security auditing',
  author: 'Dmitrii Baklai',

  author: author,
  copyright: `Copyright \u00A9 ${new Date().getFullYear()} ${author.name}`,

  social: {
    facebook: {
      title: 'Facebook',
      icon: 'mdi-facebook',
      href: config.social.facebook
    },
    github: {
      title: 'Github',
      icon: 'mdi-github',
      href: config.social.github
    },
    linkedin: {
      title: 'Linkedin',
      icon: 'mdi-linkedin',
      href: config.social.linkedin
    }
  }
});

export const getters = {
  getCopyright: (state) => {
    return `Copyright © ${new Date().getFullYear()} ${
      state.author
    }. All rights reserved.`;
  }
};

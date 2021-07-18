export const state = () => ({
  name: 'WEBNMAP',
  version: process.env.npm_package_version || '',
  description: 'Web utility for network discovery and security auditing',
  author: 'Dmitrii Baklai',

  socialLinks: [
    {
      title: 'Facebook',
      description: '',
      icon: 'mdi-facebook',
      href: 'https://www.facebook.com'
    },
    {
      title: 'Twitter',
      description: '',
      icon: 'mdi-twitter',
      href: 'https://twitter.com'
    },
    {
      title: 'Github',
      description: '',
      icon: 'mdi-github',
      href: 'https://github.com'
    }
  ]
});

export const getters = {
  getCopyright: (state) => {
    return `Copyright © ${new Date().getFullYear()} ${
      state.author
    }. All rights reserved.`;
  }
};

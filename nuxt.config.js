import colors from 'vuetify/es5/util/colors';
import dotenv from 'dotenv';
import path from 'path';

import { name, version, description, author, config } from './package.json';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '.env.prod')
      : path.join(__dirname, '.env.dev')
});

process.env.HOST =
  process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

process.env.PORT = process.env.NODE_ENV === 'production' ? '8080' : '3000';

export default {
  telemetry: false,

  ssr: true,

  cli: {
    badgeMessages: [
      `Application: ${process.env.npm_package_name.toUpperCase()} v${
        process.env.npm_package_version
      }`
    ]
  },

  server: {
    host: process.env.HOST,
    port: process.env.PORT
  },

  router: {
    prefetchLinks: false
  },

  head: {
    titleTemplate: `${config.app.short_name} • %s`,
    title: config.app.name,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'google', content: 'notranslate' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // loading: '@/components/LoadingBar.vue',

  loading: {
    continuous: true
  },

  css: ['@mdi/font/css/materialdesignicons.min.css', '~/assets/variables.css'],

  plugins: [
    { src: '~/plugins/theme', mode: 'client' },
    { src: '~/plugins/language', mode: 'client' },
    { src: '~/plugins/clipboard', mode: 'client' }
  ],

  buildModules: ['@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxt/content',
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
    '@nuxtjs/toast'
  ],

  components: true,

  dotenv: {
    filename: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev'
  },

  axios: {
    credentials: true,
    baseURL:
      process.env.NODE_ENV === 'production'
        ? `${process.env.API_URI}/api/v1/`
        : `http://${process.env.HOST}:${process.env.PORT}/api/v1/`
  },

  auth: {
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        sameSite: 'strict'
      }
    },
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signin',
      callback: false,
      home: '/'
    },
    resetOnError: true,
    watchLoggedIn: true,
    rewriteRedirects: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/signin',
            method: 'post',
            propertyName: 'token'
          },
          logout: false,
          user: {
            url: '/auth/me',
            method: 'get',
            propertyName: 'user'
          }
        }
      }
    }
  },

  pwa: {
    meta: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      mobileApp: true,
      mobileAppIOS: true,
      appleStatusBarStyle: 'black-translucent',
      favicon: true,
      name: config.app.name,
      author: author.name,
      description: description,
      theme_color: '#ffffff',
      lang: 'en',
      ogType: 'website',
      ogHost: config.host,
      ogImage: {
        path: `/icon.png`,
        width: '50',
        height: '50',
        type: 'image/png'
      },
      ogUrl: `${config.host}`,
      twitterCard: 'summary_card',
      twitterSite: `${config.host}`,
      twitterCreator: author.name,
      nativeUI: true
    },
    manifest: {
      name: config.app.name,
      short_name: config.app.short_name,
      description: description || config.app.name,
      lang: 'en',
      display: 'standalone',
      background_color: '#ffffff',
      start_url: `/?standalone=true`,
      useWebmanifestExtension: false,
      orientation: 'portrait'
    }
  },

  content: {},

  i18n: {
    lazy: false,
    langDir: 'lang/',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English'
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru-RU.js',
        name: 'Russia'
      },
      {
        code: 'ua',
        iso: 'ua-UA',
        file: 'ua-UA.js',
        name: 'Ukraine'
      }
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    vueI18n: {
      fallbackLocale: 'en'
    }
  },

  toast: {
    type: 'default',
    theme: 'toasted-primary',
    position: 'bottom-right',
    icon: 'alert-circle-outline',
    duration: 1000,
    iconPack: 'mdi',
    register: [
      {
        name: 'errorDefault',
        message: 'Oops... Something went wrong',
        options: {
          type: 'error',
          duration: 2000
        }
      }
    ]
  },

  vuetify: {
    defaultAssets: {
      font: {
        family: 'Marmelad'
      }
    },
    icons: {
      iconfont: 'mdi'
    },
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      options: {
        customProperties: true
      },
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  serverMiddleware: [
    {
      path: '/api/v1',
      handler: '~/server/index.js',
      prefix: false
    }
  ],

  build: {
    publicPath: 'app/',
    babel: {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    }
  }
};

import colors from 'vuetify/es5/util/colors';
import dotenv from 'dotenv';
import path from 'path';

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

  ssr: false,

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
    titleTemplate: 'ONMAP • %s',
    title: 'Online Network Mapper',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: {
    color: '#2196f3'
  },

  css: ['@mdi/font/css/materialdesignicons.min.css', '~/assets/variables.css'],

  plugins: [{ src: '~/plugins/themeMode', mode: 'client' }],

  buildModules: ['@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxt/content',
    '@nuxtjs/pwa',
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
      login: '/signin',
      logout: '/signin',
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

  content: {},

  vuetify: {
    defaultAssets: false,

    icons: {
      iconfont: 'mdi'
    },
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
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

  build: {}
};

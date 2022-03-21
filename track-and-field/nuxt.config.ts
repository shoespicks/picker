// @ts-ignore
import { Entry, EntryCollection } from 'contentful';
import colors from 'vuetify/es5/util/colors';
import { contentfulClient } from './plugins/contentful';
import { transrateSpikeEntityToModel } from './store/model/spike';
import { ISpikeShoesFields } from './types/generated/contentful';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - PICKER for Track and Field',
    title: 'PICKER for Track and Field',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'データでカンタン比較 陸上選手のためのスパイク検索サイト'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'PICKER for Track and Field'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'PICKER for Track and Field'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'データでカンタン比較 陸上選手のためのスパイク検索サイト'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/images/top/heroImage.jpg'
      },
      { name: 'twitter:card', content: 'summary' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Roboto&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@fortawesome/fontawesome-free/css/all.css', '~/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/contentful',
    '~/plugins/repository',
    { src: '~/plugins/amplify', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/markdownit'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    breaks: true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    theme: {
      options: { customProperties: true },
      themes: {
        light: {
          primary: colors.blue.darken2,
          secondary: colors.amber.darken3,
          accent: colors.deepOrange.darken1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    icons: {
      iconfont: 'fa'
    },
    treeShake: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]]
    },
    loaders: {
      imgUrl: { limit: 10000 }
    }
  },

  router: {
    base: '/track-and-field/',
    middleware: []
  },

  generate: {
    // https://composition-api.nuxtjs.org/getting-started/setup
    // ssg時、非同期関数の解決に問題があるらしいため追加
    interval: 2000,
    routes() {
      return contentfulClient
        .getEntries({
          content_type: 'spikeShoes'
        })
        .then((entries: EntryCollection<ISpikeShoesFields>) => {
          return entries.items.map((spike: Entry<ISpikeShoesFields>) => {
            return {
              route: `/search/${spike.fields.slug}`,
              payload: transrateSpikeEntityToModel(spike)
            };
          });
        });
    }
  },
  server: {
    port: 3200
  },
  env: {
    ENV: process.env.NODE_ENV,
    // NODE_ENVはamplyfyのデプロイ時に入る環境変数値
    CONTENTFUL_ENVIROMENT:
      process.env.NODE_ENV === 'prod' ? 'master' : 'staging',
    PICKER_CONTENTFUL_SPACE_ID: process.env.PICKER_CONTENTFUL_SPACE_ID,
    PICKER_CONTENTFUL_ACCESS_TOKEN: process.env.PICKER_CONTENTFUL_ACCESS_TOKEN
  }
};

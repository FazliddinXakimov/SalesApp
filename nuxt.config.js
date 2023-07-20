export default {
  publicRuntimeConfig: {
    baseURL: process.env.baseURL,
    axios: {
      browserBaseURL: process.env.baseURL,
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.baseURL, 
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  target: 'server',
  ssr: true,
  head: {
    title: 'SalesApp',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  css: [
    'swiper/css/swiper.css',
    '@/assets/css/main.css',
    '@/assets/css/swiper.css',
  ],
  plugins: [
    {
      src: '@/plugins/axios.js',
    },
    {
      src: '@/plugins/range-slider.js',
      ssr: false,
    },
    {
      src: '@/plugins/main.js',
    },
    {
      src: '@/plugins/persistedState.js',
      ssr: false,
    },
    {
      src: '@/plugins/swiper.js',
    },
    {
      src: '@/plugins/vue-awesome-swiper.js',
    },
    {
      src: '@/plugins/vuelidate.js',
    },
    {
      src: '@/plugins/v-tooltip.js',
    },

    {
      src: '@/plugins/v-mask.js',
      ssr: true,
    },
  ],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@nuxtjs/svg'],
  styleResources: {
    scss: ['@/assets/scss/_variables.scss'],
  },

  i18n: {
    locales: [
      {
        code: 'uz',
        file: 'uz.js',
        shortname: "O'Z",
      },
      {
        code: 'ru',
        file: 'ru.js',
        shortname: 'РУ',
      },
    ],
    lazy: false,
    defaultLocale: 'uz',
    langDir: 'lang/',
    detectBrowserLanguage: false,
    strategy: 'prefix_except_default',
  },
  // cache: {
  //   useHostPrefix: false,
  //   pages: ['/'],
  //   store: {
  //     type: 'memory',
  //     max: 30,
  //     ttl: 900,
  //   },
  // },
  axios: {
    baseURL: process.env.baseURL,
    // debug: process.env.NODE_ENV !== 'production',
  },

  modules: ['@nuxtjs/axios', '@nuxtjs/i18n'],

  build: {
    transpile: ['defu'],
  },
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
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
    port: 8000,
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
  css: ['swiper/css/swiper.css', '@/assets/css/main.css'],
  plugins: [
    {
      src: '@/plugins/axios.js',
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
      src: '@/plugins/v-mask.js',
      ssr: true,
    },
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
    '@nuxtjs/svg',
  ],

  fontawesome: {
    component: 'Fa',
    suffix: false,
    icons: {
      solid: true,
      brands: true,
      regular: true,
    },
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
  cache: {
    useHostPrefix: false,
    pages: ['/'],
    store: {
      type: 'memory',
      max: 30,
      ttl: 900,
    },
  },
  axios: {
    baseURL: process.env.baseURL,
    // debug: process.env.NODE_ENV !== 'production',
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['defu'],
  },
}

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
  ssr: false,
  head: {
    title: 'Izlab market',
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
      {
        property: 'og:image',
        content: '@/assets/img/izlab.svg', // Replace with your image URL
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '@/assets/img/filter.svg',
      },
    ],
  },
  css: [
    'swiper/css/swiper.css',
    'vue-select/dist/vue-select.css',
    '@/assets/css/main.css',
    '@/assets/scss/main.scss',
    '@/assets/css/swiper.css',
  ],
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
      src: '@/plugins/v-tooltip.js',
    },

    {
      src: '@/plugins/v-mask.js',
      ssr: true,
    },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    '@nuxtjs/style-resources',
    '@nuxt/image',
  ],
  styleResources: {
    scss: ['@/assets/scss/variables.scss'],
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

  modules: ['@nuxtjs/axios', '@nuxtjs/i18n', '@nuxtjs/auth-next'],
  auth: {
    strategies: {
      login: {
        scheme: 'refresh',
        token: {
          property: 'access',
          maxAge: 60 * 3,
          name: 'Authorization',
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: false,
        },

        endpoints: {
          login: { url: 'users/login/', method: 'post' },
          logout: false,
          refresh: { url: 'users/refresh/', method: 'post' },
          user: { url: 'users/get_me/', method: 'get' },
        },

        redirect: {
          home: '/',
        },
      },
      register: {
        scheme: 'refresh',
        token: {
          property: 'access',
          maxAge: 60 * 3,
          name: 'Authorization',
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24 * 30,
        },

        endpoints: {
          login: { url: 'users/register/', method: 'post' },
          refresh: { url: 'users/refresh/', method: 'post' },
          logout: false,
          user: false,
        },

        redirect: {
          home: '/',
        },
      },
      registerVerify: {
        scheme: 'refresh',
        token: {
          property: 'token.access',
          maxAge: 60 * 3,
          name: 'Authorization',
        },
        refreshToken: {
          property: 'token.refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: false,
        },

        endpoints: {
          login: { url: 'users/register/', method: 'post' },
          refresh: { url: 'users/refresh/', method: 'post' },
          user: { url: 'users/get_me/', method: 'get' },
          logout: false,
        },

        redirect: {
          home: '/',
        },
      },
    },
  },

  router: {
    middleware: ['auth-middleware'],
  },

  build: {
    transpile: ['defu'],
  },
}

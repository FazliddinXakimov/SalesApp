<template>
  <div>
    <Banner
      v-if="banners.length"
      :banners="banners"
      @handleClickBanner="handleClickBanner"
    />
    <!-- <Brands :brands="brands" /> -->
    <Products
      :all-products="allProducts"
      @handleClickBanner="handleClickBanner"
    />

    <div class="mb-20"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Banner from '@/components/Home/Banner.vue'
import Products from '@/components/Home/Products.vue'

export default {
  name: 'IndexPage',
  components: { Banner, Products },
  data() {
    return {
      swiperOptions: {
        loop: false,
        // spaceBetween: 16,
        lazyLoading: true,
        navigation: {
          nextEl: '.button-next',
          prevEl: '.button-prev',
        },
        watchSlidesVisibility: true,

        breakpoints: {
          0: {
            slidesPerView: 'auto',
            freeMode: true,
          },
          1200: {
            slidesPerView: 5,
            freeMode: false,
          },
          1300: {
            slidesPerView: 5,
            freeMode: false,
          },
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      allProducts: 'home/GET_MAIN_PAGE_PRODUCTS',
      banners: 'home/GET_BANNERS_LIST',
      brands: 'home/GET_BRANDS',
    }),
  },

  async mounted() {
    this.$store.commit('SET_MAIN_LOADING', true)

    await Promise.allSettled([
      this.$store.dispatch('references/FETCH_TOP_CATEGORIES'),
      this.$store.dispatch('references/FETCH_ROOT_CATEGORIES'),
      this.$store.dispatch('header/FETCH_REGIONS_LIST'),
      this.$store.dispatch('home/FETCH_MAIN_PRODUCTS'),
      this.$store.dispatch('home/FETCH_BANNERS_LIST'),
    ])

    this.$store.commit('SET_MAIN_LOADING', false)
  },
  methods: {
    handleClickBanner(banner) {
      const { product } = this.$const.linkNames

      if (banner.link_type === product) {
        this.$router.push(
          this.localePath({
            name: `product-id`,
            params: { id: banner.link_slug },
            query: { id: banner.link_item },
          })
        )
      } else {
        this.$router.push(
          this.localePath({
            name: `catalog-id`,
            params: { id: banner.link_slug },
            query: { catalog: banner.link_item },
          })
        )
      }
    },
  },
}
</script>

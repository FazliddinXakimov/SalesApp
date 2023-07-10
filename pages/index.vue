<template>
  <div>
    <Banner :banners="banners" />

    <div class="flex justify-between items-center">
      <h1 class="text-2xl mt-10 mb-4">Brands</h1>
      <span class="text-blue-400">View more ></span>
    </div>
    <HomeBrands />

    <div v-for="(data, index) in allProducts" :key="index" class="mt-16">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl mb-4">
          {{ data.title }}
        </h1>
        <span class="text-blue-400">View more ></span>
      </div>

      <div>
        <div class="grid grid-cols-4 gap-4">
          <ProductCard
            v-for="(product, ind) in data.products"
            :key="ind"
            :product="product"
          />
        </div>
      </div>
    </div>

    <div class="mb-20"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'swiper/css/swiper.css'
import ProductCard from '@/components/Product/ProductCard.vue'
import Banner from '@/components/Home/HomeBanner.vue'
import HomeBrands from '@/components/Home/HomeBrands.vue'

export default {
  name: 'IndexPage',
  components: { Banner, ProductCard, HomeBrands },
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
      allProducts: 'home/getMainPageProducts',
      banners: 'home/GET_BANNERS_LIST',
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
      this.$store.dispatch('home/FETCH_BRANDS'),
    ])

    this.$store.commit('SET_MAIN_LOADING', false)
  },
  methods: {},
}
</script>

<template>
  <div>
    <Banner :banners="banners" />

    <div v-for="(data, index) in allProducts" :key="index" class="mt-16">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl mb-4">
          {{ data.title }}
        </h1>
        <span class="text-blue-400">View more ></span>
      </div>

      <div class="swiper-products">
        <div class="swiper">
          <swiper class="swiper-wrapper" :options="swiperOptions">
            <swiper-slide
              v-for="(product, index) in data.products"
              :key="index"
              class="swiper-slide product-card-item"
            >
              <ProductCard :product="product" />
            </swiper-slide>
          </swiper>
        </div>

        <div>
          <div :class="`swiper-button-prev button-prev`"></div>
          <div :class="`swiper-button-next button-next`"></div>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl mt-10 mb-4">Brands</h1>
      <span class="text-blue-400">View more ></span>
    </div>
    <HomeBrands />
    <div class="mb-20"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ProductCard from '@/components/Product/ProductCard.vue'
import Banner from '@/components/Home/HomeBanner.vue'
import HomeBrands from '@/components/Home/HomeBrands.vue'

export default {
  name: 'IndexPage',
  components: { Banner, ProductCard, Swiper, SwiperSlide, HomeBrands },
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
            slidesPerView: 4,
            freeMode: false,
          },
          1300: {
            slidesPerView: 4,
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
      this.$store.dispatch('home/fetchMainProducts'),
      this.$store.dispatch('home/FETCH_BANNERS_LIST'),
      this.$store.dispatch('home/FETCH_BRANDS'),
    ])

    this.$store.commit('SET_MAIN_LOADING', false)
  },
  methods: {},
}
</script>

<style scoped>
.swiper-products {
  position: relative;
}

.swiper-button-next {
  right: -21px;
}
.swiper-button-prev {
  left: -21px;
}
</style>

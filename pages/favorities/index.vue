<template>
  <div class="my-10">
    <BreadCrumb :bread-crumb="breadCrumb" class="mb-10" />
    <div v-if="products.length > 0" class="swiper-products">
      <h1 class="text-2xl mb-4">{{ $t('favorities') }}</h1>
      <div
        class="grid 1024:grid-cols-5 768:grid-cols-4 640:grid-cols-2 grid-cols-1 gap-4"
      >
        <ProductCard
          v-for="(product, index) in products"
          :key="index"
          :product="product"
        />
      </div>

      <!-- v-if="products.length > 6" -->
      <div>
        <div :class="`swiper-button-prev button-prev`"></div>
        <div :class="`swiper-button-next button-next`"></div>
      </div>
    </div>
    <div v-else class="flex items-center flex-col justify-center my-20 mt-32">
      <img src="@/assets/img/heart_cart.svg" class="w-20 h-20" />
      <button
        class="mt-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="$router.push(localePath('/'))"
      >
        {{ $t('homePage') }}
      </button>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/Product/ProductCard.vue'

export default {
  components: {
    ProductCard,
  },

  data() {
    return {
      breadCrumb: [
        {
          title: this.$t('favorities'),
          // link: '/cart',
        },
      ],
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
    products() {
      return this.$store.getters['favorities/getFavoriteProducts']
    },
  },
}
</script>

<template>
  <div class="mt-10">
    <h1 class="text-2xl mb-4">Favorite Products</h1>
    <div v-if="products.length > 0" class="swiper-products">
      <div class="swiper">
        <swiper class="swiper-wrapper" :options="swiperOptions">
          <swiper-slide
            v-for="(product, index) in products"
            :key="index"
            class="swiper-slide product-card-item"
          >
            <ProductCard :product="product" />
          </swiper-slide>
        </swiper>
      </div>
      <!-- v-if="products.length > 6" -->
      <div>
        <div :class="`swiper-button-prev button-prev`"></div>
        <div :class="`swiper-button-next button-next`"></div>
      </div>
    </div>
    <div v-else class="text-center">You haven't favorite products</div>
  </div>
</template>

<script>
import ProductCard from '../components/Product/ProductCard.vue'

export default {
  components: {
    ProductCard,
  },

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
    products() {
      return this.$store.getters['favorities/getFavoriteProducts']
    },
  },
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

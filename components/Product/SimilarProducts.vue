<template>
  <div>
    <h1 class="960:text-2xl mb-4 768:text-xl font-bold text-lg">
      {{ $t('similarProducts') }}
    </h1>
    <div class="swiper-products">
      <div class="swiper">
        <swiper class="swiper-wrapper" :options="swiperOptions">
          <swiper-slide
            v-for="(product, index) in products.results"
            :key="index"
            class="swiper-slide product-card-item"
          >
            <ProductCard :product="product" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ProductCard from '@/components/Product/ProductCard.vue'
export default {
  components: {
    ProductCard,
    Swiper,
    SwiperSlide,
  },
  props: {
    products: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      swiperOptions: {
        loop: false,
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
          640: {
            slidesPerView: 4,
            freeMode: false,
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
}
</script>

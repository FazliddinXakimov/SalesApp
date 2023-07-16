<template>
  <div class="mt-10">
    <BreadCrumb :bread-crumb="breadCrumb" />
    <div v-if="products.length > 0" class="swiper-products">
      <h1 class="text-2xl mb-4">Favorite Products</h1>
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
    <div v-else class="flex items-center flex-col justify-center my-20 mt-32">
      <img src="@/assets/img/heart_cart.svg" class="w-20 h-20" />
      <div class="mt-3">Cart is Empty</div>
      <button
        class="mt-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="$router.push(localePath('/'))"
      >
        Go To Home
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
          title: 'Favorities',
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

<template>
  <div class="carusel">
    <div
      ref="mySwiper"
      v-swiper:myDirectiveSwiper="swiperOptions"
      class="swiper"
    >
      <div class="swiper-wrapper">
        <template v-if="sliders && sliders.length">
          <div
            v-for="(banner, index) in sliders"
            :key="banner.id"
            class="swiper-slide"
          >
            <!-- :width="type === 1 ? 1920 : 768" :height="type === 1 ? 400 : 450" -->
            <img
              :src="banner.img"
              :alt="banner.title"
              width="1920"
              height="400"
              :title="banner.title"
              decoding="async"
              :loading="index === 0 ? 'eager' : 'lazy'"
              quality="100"
            />
          </div>
        </template>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sliders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        spaceBetween: 0,
        lazyLoading: true,
        effect: 'fade',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
}
</script>

<style src="@/assets/css/HomeSlider.css" scoped></style>

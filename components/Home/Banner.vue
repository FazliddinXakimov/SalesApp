<template>
  <div style="background-color: #f7f7f7">
    <div>
      <swiper :options="swiperOptions1">
        <swiper-slide v-for="(item, index) in banners" :key="index">
          <img
            class="img__slide"
            :src="item.image"
            @click="$emit('handleClickBanner', item)"
          />
        </swiper-slide>

        <div slot="button-next" class="swiper-button-next"></div>
        <div slot="button-prev" class="swiper-button-prev"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      swiperOptions1: {
        autoplay: true,
        loop: false,
        lazy: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
}
</script>

<style src="@/assets/css/Banner.css" scoped></style>

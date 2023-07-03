<template>
  <div style="background-color: #f7f7f7">
    <div>
      <swiper :options="swiperOptions1">
        <swiper-slide v-for="(item, index) in banners" :key="index + 'banner'">
          <!-- <a :href="item.url" :target="item.is_blank"> -->
          <img class="img__slide" :src="item.image" @click="viewBanner(item)" />
          <!-- </a> -->
        </swiper-slide>
        <div slot="button-next" class="swiper-button-next" />
        <div slot="button-prev" class="swiper-button-prev" />
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
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },

  methods: {
    viewBanner({ id, is_viewed: isViewed }) {},
  },
}
</script>

<style src="@/assets/css/HomeBanner.css" scoped></style>

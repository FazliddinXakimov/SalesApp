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
  name: 'IndexBanner',
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
      banners: [
        {
          id: 1,
          image: require('@/assets/img/cars.jpg'),
        },
        {
          id: 2,
          image: require('@/assets/img/default.jpg'),
        },
      ],
    }
  },
  computed: {
    // ...mapGetters('knowledgeBase', ['GET_BANNER']),
    // getFiltered() {
    //   return this.GET_BANNER.filter((item) => item.type_banner === 'header')
    // },
  },
  mounted() {
    // this.FETCH_BANNER()
  },
  methods: {
    // ...mapActions('knowledgeBase', ['FETCH_BANNER', 'UPDATE_BANNER']),

    viewBanner({ id, is_viewed: isViewed }) {
      //   this.UPDATE_BANNER({
      //     id,
      //     is_viewed: isViewed + 1,
      //   })
    },
  },
}
</script>
<style>
.img__slide {
  height: 359px;
  width: 100%;
  object-fit: fill;
}

.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  pointer-events: unset !important;
}

.swipe__buttons .swiper-button-next {
  margin-right: -40px;
  margin-top: -20px;
}
.swiper-button-next,
.swiper-button-prev {
  right: 10px;
  padding: 17px;
  color: var(--black-color) !important;
  fill: black !important;
  stroke: black !important;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.8);
}

.swiper-button-next,
.swiper-button-prev {
  --swiper-navigation-size: 15px;
}

@media (max-width: 768px) {
  .img__slide {
    height: 200px;
    width: 100%;
    object-fit: cover;
  }
}
</style>

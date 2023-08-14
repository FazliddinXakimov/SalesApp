<template>
  <div class="mx-auto max-w-screen-xl">
    <div class="swiper">
      <swiper class="swiper-wrapper" :options="swiperOptions">
        <swiper-slide
          v-for="(topItem, index) in categories"
          :key="index"
          class="swiper-slide"
        >
          <nuxt-link
            :to="
              localePath({
                name: `catalog-id`,
                params: { id: topItem.slug },
                query: { catalog: topItem.id },
              })
            "
            class="border p-2 hover:text-cyan-500 cursor-pointer rounded-lg text-xs font-bold"
            :class="
              activeCategoryId == topItem.id
                ? 'border-current'
                : 'border-transparent'
            "
          >
            {{ topItem.title }}
          </nuxt-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeCategoryId: null,
      swiperOptions: {
        autoplay: false,
        loop: false,
        navigation: {
          nextEl: '.button-next',
          prevEl: '.button-prev',
        },
        watchSlidesVisibility: true,

        breakpoints: {
          0: {
            slidesPerView: 2.5,
            freeMode: false,
          },
          468: {
            slidesPerView: 2.5,
            freeMode: false,
          },
          640: {
            slidesPerView: 3.5,
            freeMode: false,
          },
          768: {
            slidesPerView: 5,
            freeMode: false,
          },
          960: {
            slidesPerView: 6,
            freeMode: false,
          },
          // 1200: {
          //   slidesPerView: 6,
          //   freeMode: false,
          // },
          1300: {
            slidesPerView: 8,
            freeMode: false,
          },
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      categories: 'references/GET_TOP_CATEGOREIS',
    }),
  },
  methods: {
    handleSelectTopCategory(category) {
      this.activeCategoryId = category.id
    },
  },
}
</script>

<style scoped>
.a {
  border: 1px solid red !important;
}
</style>

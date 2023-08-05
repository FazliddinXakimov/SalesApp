<template>
  <div class="mx-auto max-w-screen-xl">
    <div class="swiper">
      <swiper class="swiper-wrapper" :options="swiperOptions">
        <swiper-slide
          v-for="(topItem, index) in categories"
          :key="index"
          class="swiper-slide border rounded-full"
        >
          <nuxt-link
            :to="
              localePath({
                name: `catalog-id`,
                params: { id: topItem.slug },
                query: { catalog: topItem.id },
              })
            "
            class=" border-b p-2 hover:text-cyan-500 cursor-pointer"
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

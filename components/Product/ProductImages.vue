<template>
  <div class="product-gallery flex flex-row-reverse">
    <div class="product-gallery-top 1200:overflow-hidden">
      <swiper
        ref="swiperTop"
        class="swiper gallery-top"
        :options="swiperOptionTop"
      >
        <swiper-slide
          v-for="(topImage, index) in images"
          :key="index"
          class="slide-1"
        >
          <div class="gallery-top__item">
            <img
              v-if="identifyImage(topImage)"
              :src="topImage"
              :alt="name"
              :title="name"
              width="598"
              height="320"
            />

            <video v-else width="598" height="320" controls>
              <source :src="topImage" type="video/mp4" />
            </video>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <!-- swiper2 Thumbs -->
    <div class="product-gallery-thumbs hidden 1200:block 1200:z-[5]">
      <swiper
        ref="swiperThumbs"
        class="swiper gallery-thumbs"
        :options="swiperOptionThumbs"
      >
        <swiper-slide
          v-for="(thumbImage, index) in images"
          :key="index"
          class="slide-item"
        >
          <div
            :class="
              activeIndex === index
                ? 'gallery__item image__active'
                : 'gallery__item'
            "
            @click="clickThumb(index)"
          >
            <img
              v-if="identifyImage(thumbImage)"
              :src="thumbImage"
              :alt="name"
              :title="name"
              width="48"
              height="48"
            />
            <img
              v-else
              src="@/assets/img/default_video.png"
              :alt="name"
              :title="name"
              width="48"
              height="48"
            />
          </div>
        </swiper-slide>
      </swiper>
      <div v-if="images.length > 3">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeIndex: 0,
      swiperOptionTop: {
        spaceBetween: 10,
        lazy: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      swiperOptionThumbs: {
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 5,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {
          768: {
            slidesPerView: 5,
          },
        },
      },
    }
  },

  methods: {
    identifyImage(media) {
      if (media) {
        const imageExtensions = ['.gif', '.jpg', '.jpeg', '.png']

        const mediaType = media.slice(media.lastIndexOf('.'))
        return imageExtensions.includes(mediaType)
      }
    },
    clickThumb(index) {
      const swiperTop = this.$refs.swiperTop?.$swiper
      this.activeIndex = index
      swiperTop.slideTo(index)
    },
  },
}
</script>
<style lang="scss" src="@/assets/scss/ProductImages.scss" scoped></style>

<template>
  <div class="product-gallery flex flex-row-reverse">
    <div class="product-gallery-top 1200:overflow-hidden">
      <swiper
        ref="swiperTop"
        class="swiper gallery-top"
        :options="swiperOptionTop"
      >
        <swiper-slide
          v-for="(topImage, index) in imagesTop"
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
          v-for="(thumbImage, index) in imagesThumb"
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
      <div>
        <div class="swiper-button-prev">
          <button class="swiper-button-prev swiper-button-white">
            <img
              class="swiper-prev-image"
              alt="button-prev"
              title="button-prev"
              width="27"
              src="@/assets/img/arrow-left.svg"
              height="27"
            />
          </button>
        </div>
        <div class="swiper-button-next">
          <button class="swiper-button-next swiper-button-white">
            <img
              src="@/assets/img/arrow-right.svg"
              alt="button-next"
              class="swiper-next-image"
              title="button-next"
              width="27"
              height="27"
            />
          </button>
        </div>
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
    type: {
      type: Number, // 1 - for product detail,
      default: 2,
    },
    imagesTop: {
      type: Array,
      default: () => [],
    },
    imagesThumb: {
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
        slidesPerView: 4,
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

  // mounted() {
  //   if (window.innerWidth > 1024) {
  //     document.querySelectorAll('.image-zoom').forEach((elem) => {
  //       let x, y, width, height

  //       elem.onmouseenter = () => {
  //         // getBoundingClientRect() method returns the size of an element and its position relative to the viewport
  //         const size = elem.getBoundingClientRect()
  //         x = size.x
  //         y = size.y
  //         width = size.width
  //         height = size.height
  //       }
  //       // onmousemove event occurs when the pointer is moving while it is over an element
  //       elem.onmousemove = (e) => {
  //         const horizontal = ((e.clientX - x) / width) * 100
  //         const vertical = ((e.clientY - y) / height) * 100

  //         elem.style.setProperty('--x', horizontal + '%')
  //         elem.style.setProperty('--y', vertical + '%')
  //       }
  //     })
  //   }

  //   this.$nextTick(() => {
  //     setTimeout(() => {
  //       const self = this
  //       const swiperTop = this.$refs.swiperTop?.$swiper

  //       swiperTop.on('slideChange', function () {
  //         self.activeIndex = swiperTop.activeIndex
  //       })
  //     }, 150)
  //   })
  // },

  methods: {
    clickThumb(index) {
      const swiperTop = this.$refs.swiperTop?.$swiper
      this.activeIndex = index
      swiperTop.slideTo(index)
    },
    identifyImage(media) {
      if (media) {
        const imageExtensions = ['.gif', '.jpg', '.jpeg', '.png']

        const mediaType = media.slice(media.lastIndexOf('.'))
        return imageExtensions.includes(mediaType)
      }
    },
  },
}
</script>
<style lang="scss" src="@/assets/scss/ProductImages.scss"></style>

<template>
  <div class="mt-5">
    <BreadCrumb :bread-crumb="breadCrumb" />
    <ProductDetailMainSection
      :product="product"
      :selected-media="selectedMedia"
      @handleSelectMedia="handleSelectMedia"
    />

    <ProductDetailTabs :product="product" />

    <div class="mt-5">
      <h1 class="text-2xl mb-4">Similar Products</h1>
      <div class="swiper-products">
        <div class="swiper">
          <swiper class="swiper-wrapper" :options="swiperOptions">
            <swiper-slide
              v-for="(product, index) in similarProducts.results"
              :key="index"
              class="swiper-slide product-card-item"
            >
              <ProductCard :product="product" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ProductCard from '@/components/Product/ProductCard.vue'
import ProductDetailMainSection from '@/components/Product/ProductDetailMainSection.vue'
import ProductDetailTabs from '@/components/Product/ProductDetailTabs.vue'

export default {
  components: {
    ProductCard,
    Swiper,
    SwiperSlide,
    ProductDetailMainSection,
    ProductDetailTabs,
  },
  data() {
    return {
      videoController: '',
      selectedMedia: null,
      activeTab: 1,
      breadCrumb: [
        {
          title: 'Product',
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
    ...mapGetters({
      product: 'product-detail/GET_PRODUCT',
      similarProducts: 'product-detail/GET_SIMILAR_PRODUCTS',
    }),
  },

  async mounted() {
    await this.$store.dispatch(
      'product-detail/FETCH_PRODUCT_DETAIL',
      this.$route.params.id
    )
    await this.$store.dispatch(
      'product-detail/FETCH_PRODUCT_SIMILAR_PRODUCTS',
      this.product.category.id
    )

    this.selectedMedia = this.product?.images[0]
  },
  methods: {
    determineIsImage(media) {
      if (media) {
        const imageExtensions = ['.gif', '.jpg', '.jpeg', '.png']

        const mediaType = media.slice(media.lastIndexOf('.'))
        return imageExtensions.includes(mediaType)
      }
    },
    handleSelectMedia(media) {
      this.selectedMedia = media
    },
  },
}
</script>

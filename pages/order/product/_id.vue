<template>
  <div class="mt-5">
    <ProductStreamMainSection
      v-if="streamProduct"
      :product="streamProduct"
      :selected-media="selectedMedia"
      @handleSelectMedia="handleSelectMedia"
    />

    <ProductDetailTabs :product="streamProduct" />
    <!-- <pre>{{ streamProduct }}</pre> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductStreamMainSection from '@/components/Order/ProductStreamMainSection.vue'
import ProductDetailTabs from '@/components/Product/ProductDetailTabs.vue'

export default {
  components: {
    ProductStreamMainSection,
    ProductDetailTabs,
  },
  data() {
    return {
      streamProduct: {
        brand: {},
        category: {},
        seller: {},

        properties: [],
        images: [],
      },

      videoController: '',
      selectedMedia: null,
      activeTab: 1,
      breadCrumb: [
        {
          title: 'Product',
        },
      ],
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
    const route = this.$route

    const { data } = await this.$axios.get(
      `/products/product_detail_by_stream/${route.query.stream}/`
    )

    this.streamProduct = data
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

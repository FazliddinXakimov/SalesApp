<template>
  <div class="my-10">
    <BreadCrumb :bread-crumb="breadCrumb" class="my-10" />
    <ProductStreamMainSection v-if="streamProduct" :product="streamProduct" />
    <ProductDetailTabs :product="streamProduct" class="" />
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
      activeTab: 1,
      breadCrumb: [
        {
            title: this.$t('product'),
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
    const { data } = await this.$axios.get(
      `/products/product_detail_by_stream/${this.$route.query.stream}/`
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
  },
}
</script>

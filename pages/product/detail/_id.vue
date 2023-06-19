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
      defaultImg: '@/assets/img/cart.svg',
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

<style>
.firstCol img {
  cursor: pointer;
  padding: 5px;
  margin-bottom: 16px;
  width: 80px;
  height: 80px;
  transition: all 0.3s;
  background-color: white;
  object-fit: contain;
  border-radius: 5px;
}

#swal2-title {
  font-size: 29px;
  font-weight: 400;
}

.img-default-size {
  height: 200px;
  transition: all 0.2s;
}

.img-enlarged-size {
  height: 400px;
  transition: all 0.2s;
}

.np-credits {
  font-size: 12px;
  margin-bottom: 12px;
  color: #4b4b4b;
}

.list_bread {
  list-style: none;
  padding-left: 0;
}

.list_bread > li {
  display: inline;
}

.bg__danger__main {
  background: #f44336 !important;
  border-radius: 16px;
  color: #ffffff;
  letter-spacing: 0.16px;
  padding: 2px;
  font-weight: 400;
  font-size: 13px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
}

.success__badge__main {
  background: #4caf50;
  color: #ffffff;
  letter-spacing: 0.16px;
  padding: 2px;
  font-weight: 400;
  font-size: 13px;
  width: 110px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
}

.list_bread > li > a {
  color: grey !important;
  font-size: 14px !important;
  cursor: pointer !important;
}

.list_bread > li:after {
  content: ' » ';
  display: inline;
  font-size: 0.9em;
  color: #aaa;
  padding: 0 0.0725em 0 0.15em;
}

.list_bread > li:last-child:after {
  content: '';
}

.list_bread > li a.nuxt-link-exact-active.nuxt-link-active {
  color: grey;
  font-size: 14px;
}

.textGrey {
  color: grey;
  font-size: 14px;
}

.activeImageList {
  border: rgb(8, 8, 8) 2px solid;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
}
</style>

<template>
  <div class="flex justify-between">
    <div class="768:basis-1/12 firstCol">
      <div v-for="(media, indexPro) in product.images" :key="indexPro">
        <img
          v-if="identifyImage(media)"
          :src="media"
          :alt="media"
          :class="{
            activeImageList: selectedMedia === media,
          }"
          @click="handleSelectMedia(media)"
        />
        <img
          v-else
          src="@/assets/img/default_video.png"
          :alt="media"
          :class="{
            activeImageList: selectedMedia === media,
          }"
          @click="handleSelectMedia(media)"
        />
      </div>
    </div>
    <div class="w-full 768:basis-1/3 text-center mainProductDiv">
      <div class="pro__card position-relative">
        <div style="margin-top: 80px" class="setterImg">
          <img
            v-if="identifyImage(selectedMedia)"
            class="w-100 manImgProduct"
            :src="selectedMedia"
            zoom-type="hover"
            :fullscreen-on-mobile="true"
            :zoom-scale="0.7"
            :zoom-preload="true"
          />
          <video v-else-if="selectedMedia" width="450" controls>
            <source :src="selectedMedia" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
    <div class="768:basis-7/12 pl-4">
      <div class="text-xl mb-4">{{ product.title }}</div>
      <div class="text-lg mb-4">{{ product.brand.title }}</div>
      <div class="text-2xl mb-4">
        {{ product.sale_price | numberFilter }} sum
      </div>
      <div>
        <span> Delivery: </span>
        <span v-if="!product.free_delivery">
          {{ product.delivery_price | numberFilter }} sum
        </span>
        <span v-else> Free </span>
      </div>

      <div v-for="(item, index) in product.properties" :key="index">
        {{ item }}
      </div>

      <div class="flex justify-start items-center">
        <button
          v-if="isCart"
          class="flex justify-center items-center my-1 mr-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 hover:text-green-600 rounded"
          @click="$router.push(localePath('/cart'))"
        >
          <img src="@/assets/img/cart.svg" class="w-5 h-5 mr-1 text-white" />
          Перейти в корзину
        </button>
        <button
          v-else
          class="flex justify-center items-center my-1 mr-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 hover:text-green-600 rounded"
          @click="addProductToCart"
        >
          <img src="@/assets/img/cart.svg" class="w-5 h-5 mr-1 text-white" />
          Добавить в корзину
        </button>

        <button
          class="flex justify-start items-center my-1 bg-white hover:bg-gray-50 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
          @click="buyOneClickModal = true"
        >
          <img src="@/assets/img/cart.svg" class="w-5 h-5 mr-1" />
          Купить в один клик
        </button>
      </div>
    </div>
    <BuyOneClickModal :product="product" />
  </div>
</template>

<script>
import BuyOneClickModal from '@/components/Product/BuyOneClickModal.vue'

export default {
  components: {
    BuyOneClickModal,
  },

  props: {
    product: {
      type: Object,
      default: () => {},
    },

    selectedMedia: {
      type: String,
      default: '',
    },
  },

  computed: {
    isCart() {
      return this.$store.state.cart.product_ids.includes(this.product.id)
    },

    buyOneClickModal: {
      set(val) {
        this.$store.commit('modal/changeBuyOneClickModal', val)
      },
      get() {
        return this.$store.state.modal.buyOneClickModal
      },
    },
  },
  methods: {
    addProductToCart() {
      this.$store.commit('cart/ADD_PRODUCT', this.product)
    },
    identifyImage(media) {
      if (media) {
        const imageExtensions = ['.gif', '.jpg', '.jpeg', '.png']

        const mediaType = media.slice(media.lastIndexOf('.'))
        return imageExtensions.includes(mediaType)
      }
    },
    handleSelectMedia(media) {
      this.$emit('handleSelectMedia', media)
    },
  },
}
</script>

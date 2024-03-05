<template>
  <div class="960:flex justify-between">
    <div class="768:basis-4/12">
      <ProductImages :images="product.images" :name="product.title" />
    </div>

    <div class="768:basis-4/12 pl-4 mt-10 960:mt-0">
      <div class="960:text-2xl mb-4 768:text-xl font-bold text-lg">
        {{ product.title }}
      </div>
      <div v-if="product && product.brand" class="text-lg mb-4">
        {{ product.brand.title }}
      </div>

      <div class="text-lg mt-10 mb-5">{{ $t('characteristics') }}:</div>
      <ul class="list-disc">
        <li
          v-for="(item, index) in product.properties"
          :key="index"
          class="ml-4"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="768:basis-4/12 mt-10 960:mt-0">
      <div class="border rounded-md p-4">
        <div>
          <span> {{ $t('totalPrice') }}: </span>
          <span class="font-bold">
            {{ (product.sale_price + product.delivery_price) | numberFilter }}
            {{ $t('sum') }}
          </span>
        </div>
        <div>
          {{ $t('price') }}:
          <span class="font-bold"
            >{{ product.sale_price | numberFilter }} {{ $t('sum') }}
          </span>
        </div>

        <div v-if="product.bonus_exist">
          {{ $t('bonusType') }}:
          <span class="font-bold">
            {{ product.bonus_type }}
          </span>
        </div>

        <!-- <div>
          <span> {{ $t('deliveryPrice') }}: </span>
          <span v-if="!product.free_delivery" class="font-bold">
            {{ product.delivery_price | numberFilter }} {{ $t('sum') }}
          </span>
          <span v-else class="font-bold">{{ $t('free') }} </span>
        </div> -->

        <div class="mt-5">
          <button
            v-if="isCart"
            class="my-1 w-full mr-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 hover rounded"
            @click="$router.push(localePath('/cart'))"
          >
            {{ $t('goToBasket') }}
          </button>
          <button
            v-else
            class="my-1 w-full mr-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 hover rounded"
            @click="addProductToCart"
          >
            {{ $t('addToBasket') }}
          </button>

          <button
            class="my-1 w-full bg-white hover:bg-gray-50 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
            @click="buyOneClickModal = true"
          >
            {{ $t('buyOneClick') }}
          </button>
        </div>
      </div>
      <div class="my-4 flex justify-between items-center border rounded-md p-4">
        <div class="flex items-center">
          <img src="@/assets/img/seller.svg" class="w-10 h-10 mr-5" />
          <span class="font-bold"> {{ product.seller.title }}</span>
        </div>
        <button
          class="bg-transparent text-green-700 hover:bg-green-700 hover:text-white font-semibold py-2 px-4 border border-green-500 rounded"
          @click="$router.push(localePath(`/seller/${product.seller.id}`))"
        >
          {{ $t('storePage') }}
        </button>
      </div>
    </div>

    <BuyOneClickModal :product="product" />
    <SuccessModal :text="$t('successfullOrder')" />
  </div>
</template>

<script>
import BuyOneClickModal from '@/components/Product/BuyOneClickModal.vue'
import ProductImages from '@/components/Product/ProductImages.vue'
import SuccessModal from '@/components/SuccessModal.vue'

export default {
  components: {
    BuyOneClickModal,
    ProductImages,
    SuccessModal,
  },

  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    isCart() {
      return this.$store.state.cart.product_ids.includes(this.product.id)
    },
    successModal: {
      set(val) {
        this.$store.commit('modal/changeSuccessModal', val)
      },
      get() {
        return this.$store.state.modal.successModal
      },
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

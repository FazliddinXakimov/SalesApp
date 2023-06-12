<template>
  <div class="bg-white border rounded mx-2">
    <div
      class="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
      :style="`background-image: url(${product.image})`"
    >
      <div>
        <span
          v-if="product.on_sale"
          class="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none"
        >
          available
        </span>
      </div>
    </div>
    <div class="p-4 flex flex-col">
      <div class="content-center">
        <h1 class="flext justify-center text-gray-800 mt-1 cut-text">
          {{ product.title[$i18n.locale] }}
        </h1>
        <p class="flext justify-center stext-gray-800 mt-1">
          {{ product.price | numberFilter }} sum
        </p>
      </div>
      <div class="inline-flex items-center mt-2"></div>
      <div class="flex justify-between items-center mt-4">
        <button
          class="bg-slate-50 hover:bg-blue-400 text-blue-dark font-semibold py-2 px-4 border border-blue hover:bg-blue-400 rounded"
          :class="{
            'bg-blue-600': isCart,
          }"
          @click="addProductToCart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
        <button class="flex items-center justify-center">
          <img src="@/assets/img/love.svg" class="h-8 w-8" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      productIds: 'cart/getProductIds',
    }),
    isCart() {
      return this.productIds.includes(this.product.id)
    },
  },
  methods: {
    addProductToCart() {
      console.log('this.products', this.product)
      this.$store.commit('cart/ADD_PRODUCT', this.product)
    },
  },
}
</script>

<style scoped>
.cut-text {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 160px;
  height: 1.2em;
  white-space: nowrap;
}
</style>

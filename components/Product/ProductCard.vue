<template>
  <div class="bg-white border rounded mx-2">
    <nuxt-link :to="`/product/detail/${product.id}`">
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
    </nuxt-link>
    <div class="p-4 flex flex-col">
      <div class="content-center">
        <h1 class="text-center text-gray-800 mt-1 cut-text">
          <nuxt-link :to="`/product/detail/${product.id}`">
            {{ product.title }}</nuxt-link
          >
        </h1>
        <p class="text-center text-gray-800 mt-1">
          {{ product.sale_price | numberFilter }} sum
        </p>
        <p
          class="text-center text-red-500 line-through italic text-gray-800 mt-1"
        >
          {{ product.price | numberFilter }} sum
        </p>
      </div>
      <div class="inline-flex items-center mt-2"></div>
      <div class="flex justify-between items-center mt-4">
        <div v-if="!isCart" class="cursor-pointer" @click="addProductToCart">
          <img src="@/assets/img/shopping-cart.svg" class="w-9 h-9" />
  
        </div>
        <div
          v-else
          class="flex items-center justify-between bg-gray-11 rounded-lg h-8 w-[94px] border"
        >
          <button
            class="w-8 flex items-center justify-center"
            @click="handleDecrementProduct"
          >
            <img src="@/assets/img/minus.svg" class="w-4 h-4" />
          </button>
          <div class="w-8 font-bold flex items-center justify-center">
            {{ getProductCount }}
          </div>
          <button
            class="w-8 flex items-center justify-center"
            @click="hanleIncrementProduct"
          >
            <img src="@/assets/img/plus.svg" class="w-4 h-4" />
          </button>
        </div>

        <button
          class="flex items-center justify-center"
          @click="handleToggleFavorite"
        >
          <img
            v-if="isHaveFavorite"
            src="@/assets/img/favorite_active.svg"
            class="h-9 w-9"
          />
          <img v-else src="@/assets/img/favorite.svg" class="h-9 w-9" />
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
    isHaveFavorite() {
      return this.$store.getters['favorities/isHaveFavorite'](this.product.id)
    },
    isCart() {
      return this.productIds.includes(this.product.id)
    },
    getProductCount() {
      return this.$store.getters['cart/getProductCount'](this.product.id)
    },
  },
  methods: {
    addProductToCart() {
      if (this.isCart) {
        this.$store.commit('cart/REMOVE_PRODUCT', this.product.id)
      } else {
        this.$store.commit('cart/ADD_PRODUCT', this.product)
      }
    },

    hanleIncrementProduct() {
      this.$store.commit('cart/INCREMENT_PRODUCT_COUNT', this.product.id)
    },
    handleDecrementProduct() {
      this.$store.commit('cart/DECREMENT_PRODUCT_COUNT', this.product.id)
    },
    handleToggleFavorite() {
      this.$store.commit('favorities/TOGGLE_FAVORITE', this.product)
    },
  },
}
</script>

<style scoped>
.cut-text {
  text-overflow: ellipsis;
  overflow: hidden;
  /* width: 160px; */
  height: 1.2em;
  white-space: nowrap;
}
</style>

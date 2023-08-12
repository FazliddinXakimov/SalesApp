<template>
  <div
    class="bg-white border border-gray-200 overflow-hidden rounded-xl cursor-pointer shadow-md hover:-translate-y-1 duration-200"
    @click="toDetailPage(product)"
  >
    <img :src="product.image" class="768:h-48 h-28 object-contain mx-auto" />

    <div class="p-4 flex flex-col">
      <div class="content-center">
        <p class="text-gray-800 mt-1 h-24 480:h-20 768:h-16 product-card-title">
          {{ product.title }}
        </p>

        <p class="text-gray-800 mt-1">
          <span class="font-bold">
            {{ product.sale_price | numberFilter }}
          </span>
          {{ $t('sum') }}
        </p>
        <div class="old_price">
          <p
            v-if="product.on_sale"
            class="text-red-500 line-through italic text-gray-800 mt-1"
          >
            <span class="font-bold">
              {{ product.price | numberFilter }}
            </span>
            {{ $t('sum') }}
          </p>
        </div>
      </div>
      <div class="inline-flex items-center mt-2"></div>
      <div
        class="flex justify-between items-center mt-4"
        @click.stop="() => {}"
      >
        <div
          v-if="!isCart"
          class="cursor-pointer"
          @click.stop="addProductToCart"
        >
          <img src="@/assets/img/shopping-cart.svg" class="w-7 h-7" />
        </div>
        <div
          v-else
          class="flex items-center justify-between bg-gray-11 rounded-lg h-8 w-[94px] border"
        >
          <button
            class="w-8 flex items-center justify-center"
            @click.stop="handleDecrementProduct"
          >
            <img src="@/assets/img/minus.svg" class="w-4 h-4" />
          </button>
          <div class="w-8 font-bold flex items-center justify-center">
            {{ getProductCount }}
          </div>
          <button
            class="w-8 flex items-center justify-center"
            @click.stop="hanleIncrementProduct"
          >
            <img src="@/assets/img/plus.svg" class="w-4 h-4" />
          </button>
        </div>

        <button
          class="flex items-center justify-center"
          @click.stop="handleToggleFavorite"
        >
          <img
            v-if="isHaveFavorite"
            src="@/assets/img/favorite_active.svg"
            class="h-7 w-7"
          />
          <img v-else src="@/assets/img/favorite.svg" class="h-7 w-7" />
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

    toDetailPage(product) {
      this.$router.push(
        this.localePath({
          name: 'product-id',
          params: { id: product.slug },
          query: { id: product.id },
        })
      )
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

<style>
.product-card-title {
  overflow: hidden;
  max-height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines to show */
  -webkit-box-orient: vertical;
}
.old_price {
  min-height: 27px;
}
</style>

<template>
  <div class="mt-5">
    <BreadCrumb :bread-crumb="breadCrumb" />

    <div v-if="products.length > 0">
      <div class="flex justify-center">
        <h1 class="text-2xl mb-8">Product Cart</h1>
      </div>
      <div class="py-3 flex justify-between align-items-center">
        <div class="flex items-start gap-8"></div>
        <button
          class="flex cursor-pointer items-center text-secondary hover:text-primary-red"
          @click="hanldeSetEmpty"
        >
          <img src="@/assets/img/trash.svg" class="h-6 w-6" />
          Remove all
        </button>
      </div>
      <div class="flex justify-between items-start">
        <CardProducts :products="products" :is-all-selected="isAllSelected" />
        <CardProductsInfo :total-price="totalPrice" />
      </div>
    </div>
    <div v-else class="flex items-center flex-col justify-center mt-32">
      <img src="@/assets/img/shopping-cart.svg" class="w-20 h-20" />
      <div class="mt-3">Cart is Empty</div>
      <button
        class="mt-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="$router.push(localePath('/'))"
      >
        Go To Home
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CardProducts from '@/components/Cart/CardProducts.vue'
import CardProductsInfo from '@/components/Cart/CardProductsInfo.vue'

export default {
  components: { CardProducts, CardProductsInfo },
  data() {
    return {
      promo_code: '',
      breadCrumb: [
        {
          title: 'Cart',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      products: 'cart/getProducts',
      isAllSelected: 'cart/isAllProductsSelected',
      totalPrice: 'cart/getTotalPrice',
    }),
  },
  methods: {
    hanldeSetEmpty() {
      this.$store.commit('cart/SET_EMPTY_CART')
    },
  },
}
</script>

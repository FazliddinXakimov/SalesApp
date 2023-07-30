<template>
  <div class="my-10">
    <BreadCrumb :bread-crumb="breadCrumb" class="mb-10" />

    <div v-if="products.length > 0">
      <div class="flex justify-center">
        <h1 class="768:text-2xl mb-8 text-lg font-bold">{{ $t('basket') }}</h1>
      </div>
      <div class="py-3 flex justify-between align-items-center">
        <div class="flex items-start gap-8"></div>
        <button
          class="flex cursor-pointer items-center text-secondary hover:text-primary-red"
          @click="hanldeSetEmpty"
        >
          <img src="@/assets/img/trash.svg" class="h-6 w-6" />
          {{ $t('removeAll') }}
        </button>
      </div>
      <div class="1024:flex justify-between items-start">
        <CardProducts :products="products" :is-all-selected="isAllSelected" />
        <CardProductsInfo :total-price="totalPrice" />
      </div>
    </div>
    <div v-else class="flex items-center flex-col justify-center mt-32">
      <img src="@/assets/img/shopping-cart.svg" class="w-20 h-20" />
      <div class="mt-3">{{ $t('emptyBasket') }}</div>
      <button
        class="mt-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        @click="$router.push(localePath('/'))"
      >
        {{ $t('homePage') }}
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
          title: this.$t('basket'),
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

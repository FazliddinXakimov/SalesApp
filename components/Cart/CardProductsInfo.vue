<template>
  <div class="768:basis-1/3 my-10 1024:my-0">
    <div class="1024:ml-5 border p-4 rounded">
      <h1 class="text-xl pt-2 pb-5 border-b flex justify-between items-center">
        <span> {{ $t('totalPrice') }}: </span>
        <span>{{ calculateTotalPrice | numberFilter }} {{ $t('sum') }}</span>
      </h1>

      <!-- <div class="relative mb-3 flex justify-start items-stretch mt-2">
        <input
          id="register_sms_code"
          v-model="coupon_code"
          class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          type="button"
          @click="handleCheckCoupon"
        >
          {{ $t('apply') }}
        </button>
      </div> 
      <div v-if="!isCouponExist" class="text-red-600">
        {{ $t('couponInvalid') }}
      </div> -->
      <h1 class="pt-2 pb-5 flex justify-between items-center">
        <span> {{ $t('productsPrice') }}: </span>
        <span>{{ totalPrice | numberFilter }} {{ $t('sum') }}</span>
      </h1>
      <h1 class="pt-2 pb-5 flex justify-between items-center">
        <span> {{ $t('totalDiscountPrice') }}: </span>
        <span>{{ getProductDiscount | numberFilter }} {{ $t('sum') }}</span>
      </h1>
      <h1 class="pt-2 pb-5 flex justify-between items-center">
        <span> {{ $t('deliveryPrice') }}: </span>
        <span>{{ deliveryPrice | numberFilter }} {{ $t('sum') }}</span>
      </h1>
      <!-- <h1 class="pt-2 pb-5 flex justify-between items-center">
        <span> {{ $t('discount') }}: </span>
        <span>{{ discount | numberFilter }} {{ $t('sum') }}</span>
      </h1> -->
      <button
        class="flex justify-center items-center w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded ml-2"
        @click="orderModal = true"
      >
        {{ $t('checkoutOrder') }}
      </button>
    </div>
    <OrderModal :coupon-code="coupon_code" />
    <SuccessModal :text="$t('successfullOrder')" />
  </div>
</template>

<script>
import OrderModal from './OrderModal.vue'
import SuccessModal from '@/components/SuccessModal.vue'

export default {
  components: {
    SuccessModal,
    OrderModal,
  },

  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      coupon_code: '',
      discount: 0,
      isCouponExist: true,
      deliveryPrice: 0,
    }
  },
  computed: {
    orderModal: {
      set(val) {
        this.$store.commit('modal/changeOrderModal', val)
      },
      get() {
        return this.$store.state.modal.orderModal
      },
    },

    successModal: {
      set(val) {
        this.$store.commit('modal/changeSuccessModal', val)
      },
      get() {
        return this.$store.state.modal.successModal
      },
    },

    getProductDiscount() {
      return this.$store.getters['cart/getTotalDiscountPrice']
    },
    productIds() {
      return this.$store.getters['cart/getProductIds']
    },
    calculateTotalPrice() {
      return this.totalPrice + this.deliveryPrice - this.discount
    },
  },
  watch: {
    productIds: {
      handler: 'calculateDeliveryPrice',
      immediate: true,
    },
  },
  // mounted() {
  //   this.calculateDeliveryPrice()
  // },

  methods: {
    async handleCheckCoupon() {
      const response = await this.$store.dispatch('cart/CHECK_COUPON', {
        coupon_code: this.coupon_code,
      })
      this.isCouponExist = true
      if (response.data.status === 200) this.discount = response.data.discount
      else {
        this.discount = 0
        this.isCouponExist = false
        setTimeout(() => (this.isCouponExist = true), 3000)
      }
    },

    async calculateDeliveryPrice() {
      const queryParams = new URLSearchParams()
      for (const key of this.productIds) {
        queryParams.append('product_ids', key)
      }

      const response = await this.$store.dispatch(
        'cart/CALCULATE_DELIVERY_PRICE',
        queryParams.toString()
      )
      this.deliveryPrice = response.delivery_price
    },
  },
}
</script>

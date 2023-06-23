<template>
  <div class="768:basis-1/3">
    <div class="ml-5 border p-4 rounded">
      <h1 class="text-xl pt-2 pb-5 border-b flex justify-between items-center">
        <span> TotalPrice: </span>
        <span>{{ totalPrice | numberFilter }} sum</span>
      </h1>

      <div class="relative mb-3 flex justify-start items-stretch mt-2">
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
          Пременить
        </button>
      </div>
      <div v-if="!isCouponExist" class="text-red-600">Coupon is not valid</div>
      <h1 class="pt-2 pb-5 flex justify-between items-center">
        <span> Discount: </span>
        <span>{{ discount | numberFilter }} sum</span>
      </h1>
      <button
        class="flex justify-center items-center w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded ml-2"
        @click="orderModal = true"
      >
        Оформить заказ
      </button>
    </div>
    <OrderModal :coupon-code="coupon_code" />
  </div>
</template>

<script>
import OrderModal from './OrderModal.vue'

export default {
  components: {
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
  },

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
  },
}
</script>

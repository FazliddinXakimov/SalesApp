<template>
  <div class="768:basis-1/3">
    <div class="ml-5 border p-4 rounded">
      <h1 class="text-xl pt-2 pb-5 border-b flex justify-between items-center">
        <span> TotalPrice: </span>
        <span>{{ totalPrice | numberFilter }} sum</span>
      </h1>

      <div class="relative mb-3 flex justify-start items-stretch mt-2">
        <input
          v-model="coupon_code"
          type="text"
          class="relative w-full m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="promo-code"
          aria-describedby="button-addon2"
        />
        <button
          id="button-addon2"
          class="z-[2] inline-block rounded-r bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:z-[3] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          type="button"
          @click="handleCheckCoupon"
        >
          Пременить
        </button>
      </div>
      <h1 class="pt-2 pb-5 flex justify-between items-center">
        <span> DeliveryPrice: </span>
        <span>{{ discount | numberFilter }} sum</span>
      </h1>
      <button
        class="flex justify-center items-center w-full my-1 mr-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 hover:text-green-600 rounded"
      >
        <img src="@/assets/img/cart.svg" class="w-5 h-5 mr-1 text-white" />
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  },

  methods: {
    async handleCheckCoupon() {
      const response = await this.$store.dispatch('cart/CHECK_COUPON', {
        coupon_code: this.coupon_code,
      })
      if (response.data.status === 200) this.discount = response.data.discount
      else this.discount = 0
    },
  },
}
</script>

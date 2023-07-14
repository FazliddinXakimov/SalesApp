<template>
  <MainModal id="order-modal" v-model="orderModal" :backdrop-closable="false">
    <div class="order-modal__inner">
      <div class="form-item" :class="{ error_field: $v.order.name.$error }">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input
          id="name"
          v-model="order.name"
          class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        />
        <small
          v-show="!$v.order.name.minLength && $v.order.name.$error"
          class="error__text"
        >
          order.name field min value is 17
        </small>
        <small
          v-show="!$v.order.name.required && $v.order.name.$error"
          class="error__text"
        >
          order.name field is required
        </small>
      </div>
      <div class="form-item" :class="{ error_field: $v.order.phone.$error }">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="order_phone"
        >
          Phone Number
        </label>
        <input
          id="order_phone"
          v-model="order.phone"
          v-mask="'+998 ## ### ## ##'"
          class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="tel"
          placeholder="+998 ## ### ## ##"
        />
        <small
          v-show="!$v.order.phone.minLength && $v.order.phone.$error"
          class="error__text"
        >
          order.phone field min value is 17
        </small>
        <small
          v-show="!$v.order.phone.required && $v.order.phone.$error"
          class="error__text"
        >
          order.phone field is required
        </small>
      </div>

      <button
        class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
        @click="handleSubmitOrder"
      >
        Оформить заказ
      </button>

      <!-- <div
        id="successfully__alert"
        class="flex justify-center items-center flex-col"
      >
        <img src="@/assets/img/success.svg" width="80" height="80" />
        <div class="text-lg mt-3">You order has been successfully created!</div>
      </div> -->
      <!-- <div id="falsy__alert" class="flex justify-center items-center flex-col">
        <img src="@/assets/img/cancel_icon.svg" width="80" height="80" />
        <div class="text-lg mt-3">
          Something went wrong. Please try again later
        </div>
      </div> -->
    </div>
  </MainModal>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  props: {
    couponCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      order: {
        phone: '',
        name: '',
      },
    }
  },
  validations() {
    return {
      order: {
        phone: { required, minLength: minLength(17) },
        name: { required, minLength: minLength(3) },
      },
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
    async handleSubmitOrder() {
      this.$v.order.$touch()
      if (!this.$v.order.$invalid) {
        const exportProducts = this.$store.getters['cart/getProducts'].map(
          (p) => ({
            product: p.id,
            count: p.count,
          })
        )
        try {
          await this.$store.dispatch('cart/CREATE_ORDER', {
            ...this.order,
            phone: this.order.phone.replace(/\+| /g, ''),
            coupon_code: this.couponCode || null,
            products: [...exportProducts],
            //   city: 12
          })

          this.orderModal = false
        } catch (error) {}
      }
    },
  },
}
</script>

<style>
#order-modal .modal-dialog {
  height: auto;
  margin: auto;
  align-items: center;
}

#order-modal .modal-dialog .modal-site-inner {
  max-width: 480px;
  border-radius: 12px;
}

#order-modal .order-modal__inner {
  padding: 63px 18px 40px;
}

.form-item {
  padding: 5px 0;
}
</style>

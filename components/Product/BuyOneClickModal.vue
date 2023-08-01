<template>
  <MainModal
    id="buy-one-click"
    v-model="buyOneClick"
    :backdrop-closable="false"
  >
    <div class="buy-one-click__inner">
      <div class="flex justify-between items-center mb-5">
        <div class="basis-1/4">
          <img :src="product.main_image" width="90" height="90" />
        </div>
        <div class="basis-3/4 flex flex-col">
          <div class="text-lg">
            {{ product.title }}
          </div>
          <div class="flex justify-between items-center">
            <div>
              <div>
                {{ $t('totalPrice') }}
                <span class="font-bold"
                  >{{ (product.sale_price * count) | numberFilter }}
                  {{ $t('sum') }}</span
                >
              </div>
              <div>
                {{ $t('productsPrice') }}
                <span class="font-bold"
                  >{{ product.sale_price | numberFilter }} {{ $t('sum') }}</span
                >
              </div>
            </div>

            <div
              class="flex items-center justify-between bg-gray-11 rounded-lg h-8 w-[94px] 1024:ml-8 border"
            >
              <button
                class="w-8 flex items-center justify-center"
                @click="handleDecrement"
              >
                <img src="@/assets/img/minus.svg" class="w-4 h-4" />
              </button>
              <div class="w-8 font-bold flex items-center justify-center">
                {{ count }}
              </div>
              <button
                class="w-8 flex items-center justify-center"
                @click="handleIncrement"
              >
                <img src="@/assets/img/plus.svg" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-item" :class="{ error_field: $v.order.name.$error }">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          {{ $t('first_name') }}
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
          {{ $t('firstNameMinlength') }}
        </small>
        <small
          v-show="!$v.order.name.required && $v.order.name.$error"
          class="error__text"
        >
          {{ $t('firstNameRequired') }}
        </small>
      </div>
      <div class="form-item" :class="{ error_field: $v.order.phone.$error }">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="order_phone"
        >
          {{ $t('phone') }}
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
          {{ $t('invalidPhone') }}
        </small>
        <small
          v-show="!$v.order.phone.required && $v.order.phone.$error"
          class="error__text"
        >
          {{ $t('phoneRequired') }}
        </small>
      </div>

      <button
        class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
        @click="handleSubmitOrder"
      >
        {{ $t('checkout') }}
      </button>
    </div>
  </MainModal>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      order: {
        phone: '',
        name: '',
      },
      count: 1,
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
    buyOneClick: {
      set(val) {
        this.$store.commit('modal/changeBuyOneClickModal', val)
      },
      get() {
        return this.$store.state.modal.buyOneClickModal
      },
    },
  },

  methods: {
    async handleSubmitOrder() {
      this.$v.order.$touch()
      if (!this.$v.order.$invalid) {
        const exportProducts = [
          {
            count: this.count,
            product: this.product.id,
          },
        ]
        try {
          await this.$store.dispatch('cart/CREATE_ORDER', {
            ...this.order,
            phone: this.order.phone.replace(/\+| /g, ''),
            coupon_code: null,
            products: [...exportProducts],
          })

          this.buyOneClick = false
        } catch (error) {
          this.buyOneClick = true
        }
      }
    },
    handleIncrement() {
      this.count++
    },
    handleDecrement() {
      if (this.count > 1) {
        this.count--
      }
    },
  },
}
</script>

<style>
#buy-one-click .modal-dialog {
  height: auto;
  margin: auto;
  align-items: center;
}

#buy-one-click .modal-site-inner {
  max-width: 480px;
  border-radius: 12px;
}

#buy-one-click .buy-one-click__inner {
  padding: 63px 18px 40px;
}

.form-item {
  padding: 5px 0;
}
</style>

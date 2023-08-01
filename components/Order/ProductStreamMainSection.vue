<template>
  <div>
    <div class="960:flex justify-between">
      <div class="768:basis-5/12">
        <ProductImages :images="product.images" :name="product.title" />
      </div>
      <div class="768:basis-3/12 pl-4 mt-10 960:mt-0">
        <div class="text-xl mb-2 font-bold text-center 960:text-start">
          {{ product.title }}
        </div>

        <div class="text-lg mt-10 mb-5">Характеристики:</div>
        <ul class="list-disc">
          <li
            v-for="(item, index) in product.properties"
            :key="index"
            class="ml-4"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="768:basis-4/12 mt-10 960:mt-0">
        <div class="border rounded p-4">
          <div class="mb-3">
            <div class="relative flex justify-start items-stretch">
              <input
                id="register_sms_code"
                v-model="coupon_code"
                placeholder="Введите  промокод"
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
            <div v-if="!isCouponExist" class="text-red-600">
              Coupon is not valid
            </div>
          </div>
          <div class="mb-4">
            <div>
              Product price:
              <span class="font-bold"
                >{{ product.sale_price | numberFilter }} sum
              </span>
            </div>

            <div>
              <span> Delivery: </span>
              <span v-if="!product.free_delivery" class="font-bold">
                {{ product.delivery_price | numberFilter }} sum
              </span>
              <span v-else class="font-bold"> Free </span>
            </div>
            <div>
              <span> Discount: </span>
              <span class="font-bold">{{ discount | numberFilter }} sum</span>
            </div>
          </div>
          <StreamOrderModal :coupon-code="coupon_code" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

import StreamOrderModal from '@/components/Order/StreamOrderModal.vue'
import ProductImages from '@/components/Product/ProductImages.vue'

export default {
  components: {
    ProductImages,
    StreamOrderModal,
  },

  props: {
    product: {
      type: Object,
      default: () => {},
    },

    selectedMedia: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      order: {
        phone: '',
        name: '',
        region: '',
        district: '',
      },
      coupon_code: '',
      discount: 0,
      isCouponExist: true,
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
    isCart() {
      return this.$store.state.cart.product_ids.includes(this.product.id)
    },

    streamOrderModal: {
      set(val) {
        this.$store.commit('modal/changeStreamOrderModal', val)
      },
      get() {
        return this.$store.state.modal.streamOrderModal
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
    addProductToCart() {
      this.$store.commit('cart/ADD_PRODUCT', this.product)
    },

    async handleSubmitOrder() {
      this.$v.order.$touch()
      if (!this.$v.order.$invalid) {
        try {
          await this.$store.dispatch('stream/CREATE_STREAM_ORDER', {
            city: this.order.city,
            phone: this.order.phone.replace(/\+| /g, ''),
            name: this.order.name,
            stream_id: this.$route.query.stream,
            coupon_code: this.couponCode || null,
            products: [
              {
                product: this.product.id,
                count: 1,
              },
            ],
          })
        } catch (error) {}
      }
    },

    changeRegion(region) {
      if (region && region.id) {
        this.$store.dispatch('stream/FETCH_DISTRICTS_LIST', region.id)
      } else {
        this.order.district = null
      }
    },
  },
}
</script>

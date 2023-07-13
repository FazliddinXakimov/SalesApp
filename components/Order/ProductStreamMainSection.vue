<template>
  <div>
    <div class="flex justify-between">
      <div class="768:basis-5/12">
        <ProductImages
          :type="1"
          :images-top="product.images"
          :images-thumb="product.images"
          :name="product.title"
        />
      </div>
      <div class="768:basis-4/12 pl-4">
        <div class="text-xl mb-2 font-bold">{{ product.title }}</div>

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

      <div class="768:basis-3/12">
        <div class="relative mb-3 flex justify-start items-stretch mt-2">
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
        <div class="border border-gray-400 rounded p-4">
          <div class="form-item" :class="{ error_field: $v.order.name.$error }">
            <label
              class="block text-gray-700 text-sm font-bold mb-1"
              for="name"
            >
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
          <div
            class="form-item"
            :class="{ error_field: $v.order.phone.$error }"
          >
            <label
              class="block text-gray-700 text-sm font-bold mb-1"
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
          <div class="form-item">
            <label
              class="block text-gray-700 text-sm font-bold mb-1"
              for="name"
            >
              Region
            </label>
            <multiselect
              v-model="order.region"
              class="multiselect__input"
              :options="regions"
              label="name"
              track-by="id"
              :searchable="true"
              :show-labels="false"
              :allow-empty="false"
              :close-on-select="true"
              :placeholder="$t('Select')"
              @select="changeRegion($event)"
            ></multiselect>
          </div>

          <div class="form-item">
            <label
              class="block text-gray-700 text-sm font-bold mb-1"
              for="name"
            >
              District
            </label>
            <multiselect
              v-model="order.district"
              class="multiselect__input"
              :options="districts"
              label="name"
              track-by="id"
              :searchable="true"
              :show-labels="false"
              :allow-empty="false"
              :close-on-select="true"
              :placeholder="$t('Select')"
            ></multiselect>
          </div>
          <div>
            <button
              class="flex justify-center items-center w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
              @click="handleSubmitOrder"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>

    <BuyOneClickModal :product="product" />
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'
import BuyOneClickModal from '@/components/Product/BuyOneClickModal.vue'
import ProductImages from '@/components/Product/ProductImages.vue'

export default {
  components: {
    BuyOneClickModal,
    ProductImages,
    Multiselect,
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

    regions() {
      return this.$store.getters['stream/GET_REGIONS']
    },
    districts() {
      return this.$store.getters['stream/GET_DISTRICTS']
    },

    buyOneClickModal: {
      set(val) {
        this.$store.commit('modal/changeBuyOneClickModal', val)
      },
      get() {
        return this.$store.state.modal.buyOneClickModal
      },
    },
  },

  mounted() {
    this.$store.dispatch('stream/FETCH_REGIONS_LIST')
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
    identifyImage(media) {
      if (media) {
        const imageExtensions = ['.gif', '.jpg', '.jpeg', '.png']

        const mediaType = media.slice(media.lastIndexOf('.'))
        return imageExtensions.includes(mediaType)
      }
    },
    handleSelectMedia(media) {
      this.$emit('handleSelectMedia', media)
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.form-item {
  padding: 5px 0;
}
</style>

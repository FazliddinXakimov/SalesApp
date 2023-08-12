<template>
  <!-- <MainModal
    id="order-modal"
    v-model="streamOrderModal"
    :backdrop-closable="false"
  > -->
  <div class="order-modal__inner">
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
    <div
      v-if="product.city_required"
      class="form-item"
      :class="{ error_field: $v.order.region.$error }"
    >
      <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
        {{ $t('region') }}
        {{ $v.order.region.$error }}
      </label>
      <v-select
        v-model="order.region"
        :options="regions"
        :placeholder="$t('select')"
        :reduce="(value) => value.id"
        label="name"
        :searchable="false"
        @input="changeRegion"
      />

      <small
        v-show="!$v.order.region.required && $v.order.region.$error"
        class="error__text"
      >
        {{ $t('regionFieldRequired') }}
      </small>
    </div>

    <div
      v-if="product.city_required"
      class="form-item"
      :class="{ error_field: $v.order.district.$error }"
    >
      <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
        {{ $t('district') }}
      </label>
      <v-select
        v-model="order.district"
        :options="districts"
        :placeholder="$t('select')"
        :searchable="false"
        label="name"
        :reduce="(value) => value.id"
        :disabled="isDistrictDisable"
      />
      <small
        v-show="!$v.order.district.required && $v.order.district.$error"
        class="error__text"
      >
        {{ $t('regionFieldRequired') }}
      </small>
    </div>

    <button
      class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
      @click="handleSubmitOrder"
    >
      {{ $t('checkout') }}
    </button>
    <SuccessModal :text="$t('successfullOrder')" />
  </div>
  <!-- </MainModal> -->
</template>

<script>
import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
import vSelect from 'vue-select'
import SuccessModal from '@/components/SuccessModal.vue'

export default {
  components: {
    vSelect,
    SuccessModal,
  },

  props: {
    couponCode: {
      type: String,
      default: '',
    },
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
        region: '',
        district: '',
      },
    }
  },
  validations() {
    return {
      order: {
        phone: { required, minLength: minLength(17) },
        name: { required, minLength: minLength(3) },
        region: { required: requiredIf(() => this.product.city_required) },
        district: { required: requiredIf(() => this.product.city_required) },
      },
    }
  },
  computed: {
    streamOrderModal: {
      set(val) {
        this.$store.commit('modal/changeStreamOrderModal', val)
      },
      get() {
        return this.$store.state.modal.streamOrderModal
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

    isDistrictDisable() {
      return !this.order.region
    },

    regions() {
      return this.$store.getters['stream/GET_REGIONS']
    },
    districts() {
      return this.$store.getters['stream/GET_DISTRICTS']
    },
  },
  mounted() {
    this.$store.dispatch('stream/FETCH_REGIONS_LIST')
  },
  methods: {
    changeRegion(region) {
      this.order.district = null
      this.$store.dispatch('stream/FETCH_DISTRICTS_LIST', region)
    },
    async handleSubmitOrder() {
      this.$v.order.$touch()
      if (!this.$v.order.$invalid) {
        try {
          const exportData = {
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
          }

          if (this.product.city_required) {
            exportData.city = this.order.district
          }

          const response = await this.$store.dispatch(
            'stream/CREATE_STREAM_ORDER',
            {
              ...exportData,
            }
          )

          if (response.data.status === 201) {
            this.successModal = true

            setTimeout(() => {
              this.successModal = false
              this.streamOrderModal = false
              this.order = {
                phone: '',
                name: '',
                region: '',
                district: '',
              }
              this.$v.order.$reset()
              this.$router.push(this.localePath('/'))
            }, 2500)
          }

          console.log('response', response)
        } catch (error) {
          console.log('error', error)
          console.log('response', error.response)
        }
      }
    },
  },
}
</script>

<style src="vue-select/dist/vue-select.css"></style>
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

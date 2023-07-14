<template>
  <MainModal
    id="order-modal"
    v-model="streamOrderModal"
    :backdrop-closable="false"
  >
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
      <div class="form-item">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
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
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
          District
        </label>
        <multiselect
          v-model="order.district"
          class="multiselect__input"
          :disabled="isDistrictDisable"
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

      <button
        class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
        @click="handleSubmitOrder"
      >
        Оформить заказ
      </button>
    </div>
  </MainModal>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect,
  },
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

    isDistrictDisable() {
      return !this.order.region.id
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
      this.$store.dispatch('stream/FETCH_DISTRICTS_LIST', region.id)
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
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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

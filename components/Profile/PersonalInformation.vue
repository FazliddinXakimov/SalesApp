<template>
  <div class="border p-10 rounded-md text-center personal__information">
    <h1 class="text-2xl font-bold mb-5">Shaxsiy ma'lumotlar</h1>
    <div class="flex justify-between items-center">
      <div
        class="form-item w-full mr-8"
        :class="{ error_field: $v.personalData.first_name.$error }"
      >
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Phone
        </label>
        <input
          id="name"
          v-model="personalData.first_name"
          v-mask="'+998 ## ### ## ##'"
          class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="tel"
          placeholder="+998 ## ### ## ##"
        />
        <small
          v-show="
            !$v.personalData.first_name.minLength &&
            $v.personalData.first_name.$error
          "
          class="error__text"
        >
          personalData.first_name field min value is 17
        </small>
        <small
          v-show="
            !$v.personalData.first_name.required &&
            $v.personalData.first_name.$error
          "
          class="error__text"
        >
          personalData.first_name field is required
        </small>
      </div>
      <div
        class="form-item w-full mr-8"
        :class="{ error_field: $v.personalData.first_name.$error }"
      >
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input
          id="name"
          v-model="personalData.first_name"
          class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
        <small
          v-show="
            !$v.personalData.first_name.minLength &&
            $v.personalData.first_name.$error
          "
          class="error__text"
        >
          personalData.first_name field min value is 17
        </small>
        <small
          v-show="
            !$v.personalData.first_name.required &&
            $v.personalData.first_name.$error
          "
          class="error__text"
        >
          personalData.first_name field is required
        </small>
      </div>
      <div
        class="form-item w-full"
        :class="{ error_field: $v.personalData.last_name.$error }"
      >
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input
          id="name"
          v-model="personalData.last_name"
          class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
        <small
          v-show="
            !$v.personalData.last_name.minLength &&
            $v.personalData.last_name.$error
          "
          class="error__text"
        >
          personalData.last_name field min value is 17
        </small>
        <small
          v-show="
            !$v.personalData.last_name.required &&
            $v.personalData.last_name.$error
          "
          class="error__text"
        >
          personalData.last_name field is required
        </small>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="form-item w-full mr-10">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
          Region
        </label>

        <multiselect
          v-model="personalData.region"
          class="multiselect__input appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

      <div class="form-item w-full">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
          District
        </label>
        <multiselect
          v-model="personalData.district"
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
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      personalData: {
        first_name: '',
        last_name: '',
        phone_number: '',
        region: '',
        district: '',
      },
    }
  },

  validations() {
    return {
      personalData: {
        phone: { required, minLength: minLength(17) },
        first_name: { required, minLength: minLength(3) },
        last_name: { required, minLength: minLength(3) },
      },
    }
  },
  computed: {
    isDistrictDisable() {
      return !this.personalData.region.id
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
      if (region && region.id) {
        this.$store.dispatch('stream/FETCH_DISTRICTS_LIST', region.id)
      } else {
        this.order.district = null
      }
    },
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

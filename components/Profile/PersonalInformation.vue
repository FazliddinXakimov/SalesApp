<template>
  <div class="border p-10 rounded-md text-center personal__information">
    <h1 class="text-2xl font-bold mb-5">Shaxsiy ma'lumotlar</h1>
    <div class="flex justify-between items-center">
      <div
        class="form-item w-full mr-8"
        :class="{ error_field: $v.personalData.phone_number.$error }"
      >
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Phone
        </label>
        <input
          id="name"
          v-model="personalData.phone_number"
          v-mask="'+998 ## ### ## ##'"
          class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="tel"
          placeholder="+998 ## ### ## ##"
        />
        <small
          v-show="
            !$v.personalData.phone_number.minLength &&
            $v.personalData.phone_number.$error
          "
          class="error__text"
        >
          personalData.phone_number field min value is 17
        </small>
        <small
          v-show="
            !$v.personalData.phone_number.required &&
            $v.personalData.phone_number.$error
          "
          class="error__text"
        >
          personalData.phone_number field is required
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
      <div class="form-item w-full">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Username
        </label>
        <input
          id="name"
          v-model="personalData.username"
          class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
        />
      </div>
    </div>

    <div class="flex justify-between items-center">
      <div class="w-full mr-10">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
          Region
        </label>
        <v-select
          v-model="personalData.region"
          :options="regions"
          placeholder="Select an option"
          :reduce="(value) => value.id"
          label="name"
          @input="changeRegion"
        />
      </div>
      <div class="w-full">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
          District
        </label>
        <v-select
          v-model="personalData.district"
          :options="districts"
          placeholder="Select an option"
          label="name"
          :reduce="(value) => value.id"
          :disabled="isDistrictDisable"
        />
      </div>
    </div>
    <div>
      <button
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full my-2 w-96"
        @click="updateUserProfile"
      >
        Update
      </button>
    </div>
  </div>
</template>

<script>
// import Multiselect from 'vue-multiselect'
import { required, minLength } from 'vuelidate/lib/validators'
import vSelect from 'vue-select'

export default {
  components: {
    // Multiselect,
    vSelect,
  },
  data() {
    return {
      personalData: {
        first_name: '',
        username: '',
        phone_number: '',
        region: '',
        district: '',
      },
    }
  },

  validations() {
    return {
      personalData: {
        phone_number: { required, minLength: minLength(17) },
        first_name: { required, minLength: minLength(3) },
        // username: { required, minLength: minLength(3) },
      },
    }
  },
  computed: {
    isDistrictDisable() {
      return !this.personalData.region
    },

    userDetail() {
      return this.$store.getters['profile/GET_USER_DETAIL']
    },
    regions() {
      return this.$store.getters['stream/GET_REGIONS']
    },
    districts() {
      return this.$store.getters['stream/GET_DISTRICTS']
    },
  },
  async mounted() {
    this.$store.dispatch('stream/FETCH_REGIONS_LIST')
    await this.$store.dispatch('profile/FETCH_USER_DETAIL', this.$auth.user.id)

    this.personalData.username = this.userDetail.username
    this.personalData.first_name = this.userDetail.name
    this.personalData.phone_number = this.userDetail.phone.replace('998', '')
    this.personalData.region = this.userDetail?.city?.region?.id
    await this.$store.dispatch(
      'stream/FETCH_DISTRICTS_LIST',
      this.personalData.region
    )
    this.personalData.district = this.userDetail.city?.id
  },

  methods: {
    changeRegion(region) {
      // console.log('region', region)
      if (region) {
        this.$store.dispatch('stream/FETCH_DISTRICTS_LIST', region)
      } else {
        this.order.district = null
      }
    },

    async updateUserProfile() {
      this.$v.personalData.$touch()

      await this.$store.dispatch('profile/UPDATE_USER_DETAIL', {
        id: this.userDetail.id,
        data: {
          name: this.personalData.first_name,
          username: this.personalData.username,
          phone: this.personalData.phone_number.replace(/\+| /g, ''),
          city: this.personalData.district,
        },
      })

      await this.$store.dispatch(
        'profile/FETCH_USER_DETAIL',
        this.$auth.user.id
      )

      this.personalData.username = this.userDetail.username
      this.personalData.first_name = this.userDetail.name

      this.personalData.phone_number = this.userDetail.phone
    },
  },
}
</script>

<style src="vue-select/dist/vue-select.css"></style>

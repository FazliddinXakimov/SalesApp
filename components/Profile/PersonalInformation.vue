<template>
  <div class="border p-10 rounded-md personal__information">
    <h1 class="text-2xl font-bold mb-5 text-center">Shaxsiy ma'lumotlar</h1>
    <div class="grid grid-cols-1 768:grid-cols-3 640:grid-cols-2 gap-5">
      <div
        class="form-item w-full mr-8"
        :class="{ error_field: $v.personalData.phone_number.$error }"
      >
        <label class="block text-gray-700 text-sm font-bold" for="name">
          {{ $t('phone') }}
        </label>
        <input
          id="name"
          v-model="personalData.phone_number"
          v-mask="'+998 ## ### ## ##'"
          class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
          type="tel"
          placeholder="+998 ## ### ## ##"
          @keyup="keyupLoginPhone"
        />
        <small
          v-show="
            !$v.personalData.phone_number.minLength &&
            $v.personalData.phone_number.$error
          "
          class="error__text"
        >
          {{ $t('invalidPhone') }}
        </small>
        <small
          v-show="
            !$v.personalData.phone_number.required &&
            $v.personalData.phone_number.$error
          "
          class="error__text"
        >
          {{ $t('phoneRequired') }}
        </small>
      </div>
      <div
        class="form-item w-full mr-8"
        :class="{ error_field: $v.personalData.first_name.$error }"
      >
        <label class="block text-gray-700 text-sm font-bold" for="name">
          {{ $t('first_name') }}
        </label>
        <input
          id="name"
          v-model="personalData.first_name"
          class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        />
        <small
          v-show="
            !$v.personalData.first_name.minLength &&
            $v.personalData.first_name.$error
          "
          class="error__text"
        >
          {{ $t('firstNameMinlength') }}
        </small>
        <small
          v-show="
            !$v.personalData.first_name.required &&
            $v.personalData.first_name.$error
          "
          class="error__text"
        >
          {{ $t('firstNameRequired') }}
        </small>
      </div>

      <div class="form-item w-full">
        <label class="block text-gray-700 text-sm font-bold" for="name">
          Username
        </label>
        <input
          id="name"
          v-model="personalData.username"
          class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
        />
      </div>
      <div class="w-full">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
          {{ $t('region') }}
        </label>
        <v-select
          v-model="personalData.region"
          :options="regions"
          :placeholder="$t('select')"
          :reduce="(value) => value.id"
          label="name"
          @input="changeRegion"
        />
      </div>
      <div class="w-full">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
          {{ $t('district') }}
        </label>
        <v-select
          v-model="personalData.district"
          :options="districts"
          :placeholder="$t('select')"
          label="name"
          :reduce="(value) => value.id"
          :disabled="isDistrictDisable"
        />
      </div>
      <div class="w-full">
        <button
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mt-6 rounded-full w-full"
          @click="updateUserProfile"
        >
          {{ $t('update') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import vSelect from 'vue-select'
import { formatUzbekPhoneNumber } from '@/utils/phone-format'

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      personalData: {
        first_name: '',
        username: '',
        phone_number: '+998 ',
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

    console.log('this.userDetail', this.userDetail)
    this.personalData.phone_number = this.userDetail.phone.replace('998', '')
    console.log('personaldata.phone', this.personalData.phone_number)
    console.log('replace', this.userDetail.phone.replace('998', ''))
    this.personalData.region = this.userDetail?.city?.region?.id
    await this.$store.dispatch(
      'stream/FETCH_DISTRICTS_LIST',
      this.personalData.region
    )
    this.personalData.district = this.userDetail.city?.id
  },

  methods: {
    changeRegion(region) {
      if (region) {
        this.$store.dispatch('stream/FETCH_DISTRICTS_LIST', region)
        this.personalData.district = null
      } else {
        this.personalData.district = null
      }
    },

    keyupLoginPhone(e) {
      const value = e.target.value
      if (value.length < 5) {
        e.target.value = '+998 '
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

      this.personalData.phone_number = formatUzbekPhoneNumber(
        this.userDetail.phone
      )
    },
  },
}
</script>

<template>
  <div class="border p-10 rounded-md sell_with_us mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-5 text-center">Sell With Us</h1>
    <div class="flex justify-between items-center">
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
          Last Name
        </label>
        <input
          id="name"
          v-model="personalData.last_name"
          class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
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
    <div
      class="form-item w-full mr-8"
      :class="{ error_field: $v.personalData.phone.$error }"
    >
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Phone
      </label>
      <input
        id="name"
        v-model="personalData.phone"
        v-mask="'+998 ## ### ## ##'"
        class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
        type="tel"
        placeholder="+998 ## ### ## ##"
      />
      <small
        v-show="
          !$v.personalData.phone.minLength && $v.personalData.phone.$error
        "
        class="error__text"
      >
        personalData.phone field min value is 17
      </small>
      <small
        v-show="!$v.personalData.phone.required && $v.personalData.phone.$error"
        class="error__text"
      >
        personalData.phone field is required
      </small>
    </div>
    <div>
      <label for="message" class="block text-gray-700 text-sm font-bold mb-2"
        >Comment</label
      >
      <textarea
        id="message"
        v-model="personalData.comment"
        rows="4"
        class="block p-2.5 w-full text-sm rounded border border-gray-300"
      ></textarea>
    </div>

    <div class="flex justify-between mt-2">
      <button
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mt-6 rounded w-full"
        @click="createProposal"
      >
        Подвердить
      </button>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  components: {},
  data() {
    return {
      personalData: {
        first_name: '',
        last_name: '',
        phone: '+998 ',
        comment: '',
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

  methods: {
    async createProposal() {
      this.$v.personalData.$touch()

      console.log('this.personalData', this.personalData)
      if (!this.$v.personalData.$invalid) {
        await this.$store.dispatch('references/CREATE_PROPOSAL', {
          ...this.personalData,
          phone: this.personalData.phone.replace(/\+| /g, ''),
        })
      }
    },
  },
}
</script>

<style scoped>
.sell_with_us {
  max-width: 600px;
}
</style>

<template>
  <div class="border p-10 rounded-md sell_with_us mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-5 text-center">{{ $t('sellWithUs') }}</h1>
    <div class="flex justify-between items-center">
      <div
        class="form-item w-full mr-8"
        :class="{ error_field: $v.personalData.first_name.$error }"
      >
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
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
      <div
        class="form-item w-full"
        :class="{ error_field: $v.personalData.last_name.$error }"
      >
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          {{ $t('last_name') }}
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
          {{ $t('lastNameMinlength') }}
        </small>
        <small
          v-show="
            !$v.personalData.last_name.required &&
            $v.personalData.last_name.$error
          "
          class="error__text"
        >
          {{ $t('lastNameRequired') }}
        </small>
      </div>
    </div>
    <div
      class="form-item w-full mr-8"
      :class="{ error_field: $v.personalData.phone.$error }"
    >
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        {{ $t('phone') }}
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
        {{ $t('invalidPhone') }}
      </small>
      <small
        v-show="!$v.personalData.phone.required && $v.personalData.phone.$error"
        class="error__text"
      >
        {{ $t('phoneRequired') }}
      </small>
    </div>
    <div>
      <label for="message" class="block text-gray-700 text-sm font-bold mb-2">{{
        $t('comment')
      }}</label>
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
        {{ $t('confirm') }}
      </button>
    </div>
    <SuccessModal :text="$t('successfullRequest-')" />
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import SuccessModal from '@/components/SuccessModal.vue'

export default {
  components: {
    SuccessModal,
  },
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

  computed: {
    successModal: {
      set(val) {
        this.$store.commit('modal/changeSuccessModal', val)
      },
      get() {
        return this.$store.state.modal.successModal
      },
    },
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
        const response = await this.$store.dispatch(
          'references/CREATE_PROPOSAL',
          {
            ...this.personalData,
            phone: this.personalData.phone.replace(/\+| /g, ''),
          }
        )

        if (response.status === 200) {
          this.successModal = true

          setTimeout(() => {
            this.successModal = false

            this.$router.push(this.localePath('/'))
          }, 1500)
        }
        console.log('response', response)
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

<template>
  <div class="border p-10 rounded-md">
    <h1 class="text-2xl font-bold mb-5 text-center">
      {{ $t('changePassword') }}
    </h1>
    <div
      class="relative form-item mx-auto max-w-xs"
      :class="{ error_field: $v.newPassword.password.$error }"
    >
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="newPassword"
      >
        {{ $t('password') }}
      </label>
      <div class="relative">
        <input
          id="newPassword"
          v-model.trim="newPassword.password"
          class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
          :type="passwordType1"
          placeholder=""
        />
        <span
          class="absolute right-4 top-2"
          @click="
            passwordType1 == 'password'
              ? (passwordType1 = 'text')
              : (passwordType1 = 'password')
          "
        >
          <img
            v-if="passwordType1 == 'password'"
            src="@/assets/img/eye.svg"
            alt="eye-icon"
            class="cursor-pointer w-5"
          />

          <img
            v-if="passwordType1 == 'text'"
            src="@/assets/img/eye-slash.svg"
            alt="eye-slash-icon"
            class="cursor-pointer w-5"
          />
        </span>
      </div>
      <small
        v-show="
          !$v.newPassword.password.required && $v.newPassword.password.$error
        "
        class="error__text"
      >
        {{ $t('passwordRequired') }}
      </small>
      <small
        v-show="
          !$v.newPassword.password.minLength && $v.newPassword.password.$error
        "
        class="error__text"
      >
        {{ $t('passwordInvalid') }}
      </small>
    </div>
    <div
      class="relative form-item mx-auto max-w-xs"
      :class="{ error_field: $v.newPassword.repeatPassword.$error }"
    >
      <div>
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="newPassword"
        >
          {{ $t('passwordConfirmation') }}
        </label>
        <div class="relative">
          <input
            id="newPassword"
            v-model.trim="newPassword.repeatPassword"
            class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
            :type="passwordType2"
            placeholder=""
          />
          <span
            class="absolute right-4 top-2"
            @click="
              passwordType2 == 'password'
                ? (passwordType2 = 'text')
                : (passwordType2 = 'password')
            "
          >
            <img
              v-if="passwordType2 == 'password'"
              src="@/assets/img/eye.svg"
              alt="eye-icon"
              class="cursor-pointer w-5"
            />

            <img
              v-if="passwordType2 == 'text'"
              src="@/assets/img/eye-slash.svg"
              alt="eye-slash-icon"
              class="cursor-pointer w-5"
            />
          </span>
        </div>
        <small
          v-if="
            !$v.newPassword.repeatPassword.required &&
            $v.newPassword.repeatPassword.$error
          "
          class="error__text"
        >
          {{ $t('passwordRequired') }}
        </small>

        <small
          v-else-if="
            !$v.newPassword.repeatPassword.minLength &&
            $v.newPassword.repeatPassword.$error
          "
          class="error__text"
        >
          {{ $t('passwordInvalid') }}
        </small>
        <small
          v-else-if="
            !$v.newPassword.repeatPassword.sameAs &&
            $v.newPassword.repeatPassword.$error
          "
          class="error__text"
        >
          {{ $t('passwordsNotSimilar') }}
        </small>
      </div>
    </div>
    <div class="mx-auto max-w-xs">
      <button
        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mt-6 rounded-full w-full"
        @click="updatePassword"
      >
        {{ $t('changePassword') }}
      </button>
    </div>
    <SuccessModal :text="$t('successfullPassword')" />
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
// eslint-disable-next-line no-unused-vars
import SuccessModal from '@/components/SuccessModal.vue'

export default {
  components: {
    SuccessModal,
  },
  data() {
    return {
      newPassword: {
        password: null,
        repeatPassword: null,
      },
      passwordType1: 'password',
      passwordType2: 'password',
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
      newPassword: {
        password: {
          required,
          minLength: minLength(6),
        },
        repeatPassword: {
          required,
          minLength: minLength(6),
          sameAsPassword: sameAs('password'),
        },
      },
    }
  },

  methods: {
    async updatePassword() {
      this.$v.newPassword.$touch()
      if (!this.$v.newPassword.$invalid) {
        await this.$store.dispatch('profile/UPDATE_USER_PASSWORD', {
          new_password: this.newPassword.password,
          user_id: this.$auth.user.id,
        })

        this.successModal = true
        setTimeout(() => {
          this.successModal = false
        }, 2500)
      }
    },
  },
}
</script>

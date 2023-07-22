<template>
  <div>
    <!-- <h1 class="text-center font-bold text-xl">Login</h1> -->
    <div
      class="form-item"
      :class="{ error_field: $v.login.phone.$error || isLoginOrPasswordError }"
    >
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="login_phone"
      >
        Phone Number
      </label>
      <input
        id="login_phone"
        v-model="login.phone"
        v-mask="'+998 ## ### ## ##'"
        class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="tel"
        placeholder="+998 ## ### ## ##"
        @keyup="isLoginOrPasswordError = false"
      />
      <small
        v-show="!$v.login.phone.minLength && $v.login.phone.$error"
        class="error__text"
      >
        please enter valid phone number
      </small>
      <small
        v-show="!$v.login.phone.required && $v.login.phone.$error"
        class="error__text"
      >
        phone field is required
      </small>
    </div>
    <div
      class="relative form-item"
      :class="{
        error_field: $v.login.password.$error || isLoginOrPasswordError,
      }"
    >
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="login_sms_code"
      >
        Password
      </label>
      <div class="relative">
        <input
          id="login_sms_code"
          v-model.trim="login.password"
          class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :type="passwordType"
          placeholder=""
          @keyup="isLoginOrPasswordError = false"
        />
        <span
          class="absolute right-4 top-2"
          @click="
            passwordType == 'password'
              ? (passwordType = 'text')
              : (passwordType = 'password')
          "
        >
          <img
            v-if="passwordType == 'password'"
            src="@/assets/img/eye.svg"
            alt="eye-icon"
            class="cursor-pointer w-5"
          />

          <img
            v-if="passwordType == 'text'"
            src="@/assets/img/eye-slash.svg"
            alt="eye-slash-icon"
            class="cursor-pointer w-5"
          />
        </span>
      </div>
      <small
        v-show="!$v.login.password.required && $v.login.password.$error"
        class="error__text"
      >
        password field is required
      </small>
    </div>
    <div v-if="isLoginOrPasswordError" class="error__text flex justify-center">
      Phone or password is invalid, please check
    </div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
      @click="handleLogin"
    >
      Login
    </button>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      login: {
        phone: '',
        password: '',
      },
      passwordType: 'password',
      isLoginOrPasswordError: false,
    }
  },
  computed: {
    loginModal: {
      set(val) {
        this.$store.commit('modal/changeLoginModal', val)
      },
      get() {
        return this.$store.state.modal.loginModal
      },
    },
  },

  methods: {
    closeModal() {
      this.$store.commit('modal/changeLoginModal', false)
    },

    async handleLogin() {
      this.$v.login.$touch()
      if (!this.$v.login.$invalid) {
        try {
          const res = await this.$auth.loginWith('login', {
            data: {
              phone: this.login.phone.replace(/\+| /g, ''),
              password: this.login.password,
            },
          })

          this.loginModal = false

          console.log('res', res)
          console.log('$auth', this.$auth)
        } catch (error) {
          console.log('error', error)
          console.log('error.resposne', error.response)
          console.error('Login failed:', error)
          this.isLoginOrPasswordError = true
        }
      }
    },
  },
  validations() {
    return {
      login: {
        phone: { required, minLength: minLength(17) },
        password: { required },
      },
    }
  },
}
</script>

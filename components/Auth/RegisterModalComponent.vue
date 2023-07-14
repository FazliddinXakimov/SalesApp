<template>
  <div>
    <h1 class="text-center font-bold text-xl">Register</h1>
    <div
      v-if="registerIndex == 1"
      class="form-item"
      :class="{ error_field: $v.register.phone.$error }"
    >
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="register_phone"
      >
        Phone Number
      </label>
      <input
        id="register_phone"
        v-model="register.phone"
        v-mask="'+998 ## ### ## ##'"
        class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="tel"
        placeholder="+998 ## ### ## ##"
      />
      <small
        v-show="!$v.register.phone.minLength && $v.register.phone.$error"
        class="error__text"
      >
        phone field min value is 17
      </small>
      <small
        v-show="!$v.register.phone.required && $v.register.phone.$error"
        class="error__text"
      >
        phone field is required
      </small>
    </div>

    <button
      v-if="registerIndex == 1"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
      @click="registerPhone"
    >
      Send Phone
    </button>
    <div
      v-if="registerIndex == 2"
      class="form-item"
      :class="{ error_field: $v.register.code.$error }"
    >
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="register_sms_code"
      >
        Sms Code
      </label>
      <input
        id="register_sms_code"
        v-model.trim="register.code"
        v-mask="'# # # # #'"
        class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="tell"
        placeholder=""
      />
      <small
        v-show="!$v.register.code.required && $v.register.code.$error"
        class="error__text"
      >
        SMS code fill is required
      </small>
      <small
        v-show="!$v.register.code.minLength && $v.register.code.$error"
        class="error__text"
      >
        please enter valid code
      </small>
    </div>

    <button
      v-if="registerIndex == 2"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
      @click="registerPhonseSms"
    >
      Send Code
    </button>

    <div
      v-if="registerIndex == 3"
      class="relative form-item"
      :class="{ error_field: $v.register.password.$error }"
    >
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="register_sms_code"
      >
        Password
      </label>
      <div class="relative">
        <input
          id="register_sms_code"
          v-model="register.password"
          class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :type="passwordType"
          placeholder=""
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
        v-show="!$v.register.password.required && $v.register.password.$error"
        class="error__text"
      >
        please enter valid password
      </small>
    </div>

    <button
      v-if="registerIndex == 3"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
      @click="registerVerify"
    >
      Register
    </button>
    <div class="text-center mt-4">
      Already have an account ?
      <a href="#" class="text-blue-600" @click="currentComp = 'Login'"
        >Sign in here</a
      >
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      register: {
        phone: '',
        code: '',
        temp_user: '',
        password: '',
        auto_created: false,
      },
      passwordType: 'password',
      registerIndex: 1,
    }
  },
  computed: {
    currentComp: {
      set(val) {
        this.$store.commit('auth/SET_AUTH_TYPE', val)
      },
      get() {
        return this.$store.getters['auth/getCurrentAuthType']
      },
    },
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

    async registerPhone() {
      this.$v.register.phone.$touch()
      if (!this.$v.register.phone.$invalid) {
        const res = await this.$axios.post('users/register/', {
          phone: this.register.phone.replace(/\+| /g, ''),
        })
        this.$v.register.phone.$touch()
        this.register.temp_user = res.data.id
        this.register.auto_created = res.data.auto_created
        this.registerIndex = 2
      }
    },

    async registerPhonseSms() {
      this.$v.register.code.$touch()
      if (!this.$v.register.code.$invalid) {
        await this.$axios.post('users/register/', {
          sms_code: this.register.code.replace(/\+| /g, ''),
          auto_created: this.register.auto_created,
          temp_user: this.register.temp_user,
        })
        this.registerIndex = 3
      }
    },
    async registerVerify() {
      this.$v.register.password.$touch()
      if (!this.$v.register.password.$invalid) {
        const response = await this.$axios.post('users/register/', {
          password: this.register.password,
          auto_created: this.register.auto_created,
          temp_user: this.register.temp_user,
        })
        console.log('response', response)

        if (response.data.success) {
          this.$store.commit('auth/setUserData', response.data)
          this.$store.commit('auth/setToken', response.data.token)
          this.loginModal = false
        }
      }
    },
  },
  validations() {
    return {
      register: {
        phone: { required, minLength: minLength(17) },
        code: { required, minLength: minLength(9) },
        password: { required },
      },
    }
  },
}
</script>

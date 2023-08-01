<template>
  <div>
    <!-- <h1 class="text-center font-bold text-xl">Register</h1> -->

    <ol class="flex justify-center items-center w-full mb-4 sm:mb-5">
      <li
        class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block"
        :class="
          registerIndex === 1
            ? 'text-blue-600 after:border-blue-100'
            : 'after:border-gray-100'
        "
      >
        <div
          class="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 cursor-pointer"
          :class="registerIndex === 1 ? 'bg-blue-100 ' : 'bg-gray-100'"
          @click="() => (registerIndex = 1)"
        >
          <img class="w-5 h-5" src="@/assets/img/register-phone.svg" />
        </div>
      </li>
      <li
        class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block"
        :class="
          registerIndex === 2
            ? 'text-blue-600 after:border-blue-100'
            : 'after:border-gray-100'
        "
      >
        <div
          class="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 cursor-pointer"
          :class="registerIndex === 2 ? 'bg-blue-100 ' : 'bg-gray-100'"
          @click="() => (registerIndex = 2)"
        >
          <img class="w-7 h-7" src="@/assets/img/register-sms.svg" />
          <!-- <img src="@/assets/img/register-sms.svg" /> -->
        </div>
      </li>
      <li class="flex items-center">
        <div
          :class="registerIndex === 3 ? 'bg-blue-100 shrink-0' : 'bg-gray-100'"
          class="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 cursor-pointer"
          @click="() => (registerIndex = 3)"
        >
          <img class="w-6 h-6" src="@/assets/img/register-password.svg" />
        </div>
      </li>
    </ol>

    <div
      v-if="registerIndex == 1"
      class="form-item"
      :class="{ error_field: $v.register.phone.$error || !isPhoneSuccess }"
    >
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="register_phone"
      >
        {{ $t('phone') }}
      </label>
      <input
        id="register_phone"
        v-model="register.phone"
        v-mask="'+998 ## ### ## ##'"
        class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="tel"
        placeholder="+998 ## ### ## ##"
        @keyup="keyUpRegisterPhone"
      />
      <small
        v-show="!$v.register.phone.required && $v.register.phone.$error"
        class="error__text"
      >
        {{ $t('phoneRequired') }}
      </small>
      <small
        v-show="!$v.register.phone.minLength && $v.register.phone.$error"
        class="error__text"
      >
        {{ $t('invalidPhone') }}
      </small>
      <small
        v-show="
          phoneErrorCode === $const.responseStatus.PHONE_NUMBER_ALREADY_TAKEN &&
          $v.register.phone.minLength
        "
        class="error__text"
      >
        {{ $t('phoneAlreadyTaken') }}
      </small>
    </div>

    <button
      v-if="registerIndex == 1"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
      @click="registerPhone"
    >
      {{ $t('further') }}
    </button>
    <div
      v-if="registerIndex == 2"
      class="form-item"
      :class="{ error_field: $v.register.code.$error || !isSmsSuccess }"
    >
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="register_sms_code"
      >
        {{ $t('smsCode') }}
      </label>
      <input
        id="register_sms_code"
        v-model.trim="register.code"
        v-mask="'# # # # #'"
        class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="tell"
        placeholder=""
        @keyup="keyUpSmsCode"
      />
      <small
        v-show="!$v.register.code.required && $v.register.code.$error"
        class="error__text"
      >
        {{ $t('smsCodeFill') }}
      </small>
      <small
        v-show="!$v.register.code.minLength && $v.register.code.$error"
        class="error__text"
      >
        {{ $t('smsInvalid') }}
      </small>
      <small
        v-show="
          smsErrorCode === $const.responseStatus.SMS_CODE_ERROR &&
          $v.register.code.minLength
        "
        class="error__text"
      >
        {{ $t('smsError') }}
      </small>
    </div>

    <button
      v-if="registerIndex == 2"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
      @click="registerPhonseSms"
    >
      {{ $t('further') }}
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
        {{ $t('password') }}
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
        {{ $t('passwordInvalid') }}
      </small>
    </div>

    <button
      v-if="registerIndex == 3"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
      @click="registerVerify"
    >
      {{ $t("register") }}
    </button>
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
      isPhoneSuccess: true,
      phoneErrorCode: '',
      isSmsSuccess: true,
      smsErrorCode: '',
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

    keyUpRegisterPhone() {
      this.isPhoneSuccess = true
      this.phoneErrorCode = ''
    },
    keyUpSmsCode() {
      this.isSmsSuccess = true
      this.smsErrorCode = ''
    },

    async registerPhone() {
      this.$v.register.phone.$touch()
      if (!this.$v.register.phone.$invalid) {
        const res = await this.$auth.loginWith('register', {
          data: { phone: this.register.phone.replace(/\+| /g, '') },
        })
        if (res.data.status === 200) {
          this.isPhoneSuccess = true
          this.register.temp_user = res.data.id
          this.register.auto_created = res.data.auto_created
          this.registerIndex = 2
        } else {
          this.phoneErrorCode = res.data.status

          this.isPhoneSuccess = false
        }
      }
    },

    async registerPhonseSms() {
      if (this.$v.register.phone.$invalid) {
        this.registerIndex = 1
      }

      this.$v.register.code.$touch()
      if (!this.$v.register.code.$invalid) {
        const res = await this.$auth.loginWith('register', {
          data: {
            sms_code: this.register.code.replace(/\+| /g, ''),
            auto_created: this.register.auto_created,
            temp_user: this.register.temp_user,
          },
        })

        if (res.data.status === 200) {
          this.isSmsSuccess = true
          this.registerIndex = 3
        } else {
          this.smsErrorCode = res.data.status
          this.isSmsSuccess = false
        }
      }
    },
    async registerVerify() {
      if (this.$v.register.phone.$invalid) {
        this.registerIndex = 1
        return
      }

      if (this.$v.register.code.$invalid) {
        this.registerIndex = 2
        return
      }

      this.$v.register.password.$touch()
      if (!this.$v.register.password.$invalid) {
        const response = await this.$auth.loginWith('registerVerify', {
          data: {
            password: this.register.password,
            auto_created: this.register.auto_created,
            temp_user: this.register.temp_user,
          },
        })

        console.log('data', response.data)

        // this.$auth.setUser(userData);

        if (response.data.success) {
          this.loginModal = false
        }

        console.log('$authdd', this.$auth)
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

<template>
  <div class="border p-10 rounded-md text-center">
    <h1 class="text-2xl font-bold mb-5">Change Password</h1>
    <div
      class="relative form-item w-96 mx-auto"
      :class="{ error_field: $v.newPassword.password.$error }"
    >
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="newPassword"
      >
        Password
      </label>
      <div class="relative">
        <input
          id="newPassword"
          v-model.trim="newPassword.password"
          class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
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
        v-show="
          !$v.newPassword.password.required && $v.newPassword.password.$error
        "
        class="error__text"
      >
        please enter valid password
      </small>
    </div>
    <div
      class="relative form-item w-96 mx-auto"
      :class="{ error_field: $v.newPassword.repeatPassword.$error }"
    >
      <div>
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="newPassword"
        >
          Password Confirmation
        </label>
        <div class="relative">
          <input
            id="newPassword"
            v-model.trim="newPassword.repeatPassword"
            class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
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
          v-show="
            !$v.newPassword.repeatPassword.required &&
            $v.newPassword.repeatPassword.$error
          "
          class="error__text"
        >
          please enter valid password
        </small>
      </div>
    </div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-2 w-96"
    >
      Update Password
    </button>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      newPassword: {
        password: null,
        repeatPassword: null,
      },
      passwordType: 'password',
    }
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
}
</script>

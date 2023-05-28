<template>
  <MainModal id="login-modal" v-model="loginModal">
    <div class="login-modal__inner">
      <div v-if="registerIndex == 1" class="form-item">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Phone Number
        </label>
        <input
          id="username"
          v-model="register.phone"
          v-mask="'+998 ## ### ## ##'"
          class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="tell"
          placeholder="Username"
        />
      </div>
      <div v-if="registerIndex == 2" class="form-item">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Code
        </label>
        <input
          id="username"
          v-model="register.code"
          v-mask="'######'"
          class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="tell"
          placeholder="Username"
        />
      </div>
      <button
        v-if="registerIndex == 1"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
        @click="registerUser"
      >
        Register
      </button>

      <button
        v-if="registerIndex == 2"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
        @click="sendCode"
      >
        Send Code
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full my-2"
        @click="registerFull"
      >
        Send
      </button>
    </div>
  </MainModal>
</template>

<script>
export default {
  data() {
    return {
      register: {
        phone: '',
        code: '',
        temp_user: '',
      },
      registerIndex: 1,
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

    async registerSendPhone() {
      const res = await this.$axios.post('users/register/', {
        phone: this.register.phone.replace(/\+| /g, ''),
      })
      this.register.temp_user = res.data.id

      this.registerIndex = 2
    },

    async sendCode() {
      await this.$axios.post('users/register/', {
        sms_code: this.register.code,
        auto_created: false,
        temp_user: this.register.temp_user,
      })
    },
    async registerFull() {
      await this.$axios.post('users/register/', {
        password: 'fdsafdasf',
        auto_created: false,
        temp_user: this.register.temp_user,
      })
    },
  },
}
</script>

<style>
#login-modal .modal-dialog {
  height: auto;
  margin: auto;
  align-items: center;
}

#login-modal .modal-dialog .modal-site-inner {
  max-width: 480px;
  border-radius: 12px;
}

#login-modal .login-modal__inner {
  padding: 63px 10px 40px;
}

.form-item {
  padding: 10px 0;
}
</style>

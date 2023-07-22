<template>
  <MainModal id="login-modal" v-model="loginModal" :backdrop-closable="false">
    <div class="login-modal__inner">
      <ul
        class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-5"
      >
        <li class="mr-2">
          <span
            href="#"
            aria-current="page"
            class="inline-block p-4 rounded-t-lg"
            :class="getTabComponent('Login')"
            @click="currentComp = 'Login'"
            >Login</span
          >
        </li>
        <li class="mr-2">
          <span
            href="#"
            class="inline-block p-4 rounded-t-lg"
            :class="getTabComponent('Register')"
            @click="currentComp = 'Register'"
            >Register</span
          >
        </li>
      </ul>
      <KeepAlive>
        <component :is="currentComp" />
      </KeepAlive>
    </div>
  </MainModal>
</template>

<script>
import Login from '@/components/Auth/LoginModalComponent.vue'
import Register from '@/components/Auth/RegisterModalComponent.vue'

export default {
  components: {
    Login,
    Register,
  },
  data() {
    return {
      currentComp: 'Login',
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

  mounted() {
    console.log('$auth', this.$auth)
  },

  methods: {
    getTabComponent(comp) {
      return this.currentComp === comp
        ? 'active text-blue-600 bg-gray-100'
        : 'hover:text-gray-600 hover:bg-gray-50'
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

#login-modal .modal-site-inner {
  max-width: 480px;
  border-radius: 12px;
}

#login-modal .login-modal__inner {
  padding: 63px 18px 40px;
}

.form-item {
  padding: 5px 0;
}
</style>

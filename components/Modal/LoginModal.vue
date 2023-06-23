<template>
  <MainModal id="login-modal" v-model="loginModal" :backdrop-closable="false">
    <div class="login-modal__inner">
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

  computed: {
    currentComp: {
      set(val) {
        this.$store.commit('modal/SET_AUTH_TYPE', val)
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
}
</script>

<style scoped>
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
  padding: 63px 10px 40px;
}

.form-item {
  padding: 10px 0;
}
</style>

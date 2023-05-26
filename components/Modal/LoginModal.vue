<template>
  <MainModal
    v-if="$store.state.modal.loginModal"
    modal-id="login-modal"
    @closeModal="cloaseModal"
  >
  </MainModal>
</template>

<script>
export default {
  components: {
    MainModal: () => import('@/components/Modal/LoginModal.vue'),
  },
  methods: {
    closeModal() {
      this.$store.commit('modal/changeLoginModal', false)
    },
  },
}
</script>

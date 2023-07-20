<template>
  <MainModal id="order-modal" v-model="successModal" :backdrop-closable="false">
    <div class="order-modal__inner">
      <div class="flex justify-between flex-col items-center">
        <img
          src="@/assets/img/success.svg"
          alt="success image"
          class="w-16 h-16 mb-5"
        />
        <div>
          {{ text }}
        </div>
      </div>
    </div>
  </MainModal>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
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
}
</script>

<style>
#order-modal .modal-dialog {
  height: auto;
  margin: auto;
  align-items: center;
}

#order-modal .modal-dialog .modal-site-inner {
  max-width: 480px;
  border-radius: 12px;
}

#order-modal .order-modal__inner {
  padding: 63px 18px 40px;
}

.form-item {
  padding: 5px 0;
}
</style>

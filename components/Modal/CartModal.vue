<template>
  <MainModal id="cart-modal" v-model="cartModal">
    <div class="cart-modal__inner">Cart Basket Modal</div>
  </MainModal>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    cartModal: {
      set(val) {
        this.$store.commit('modal/changeCartModal', val)
      },
      get() {
        return this.$store.state.modal.cartModal
      },
    },
  },
}
</script>

<style>
#cart-modal .modal-dialog {
  height: auto;
  margin: auto;
  align-items: center;
}

#cart-modal .modal-dialog .modal-site-inner {
  max-width: 480px;
  border-radius: 12px;
}

#cart-modal .cart-modal__inner {
  padding: 63px 10px 40px;
}

.form-item {
  padding: 10px 0;
}
</style>

<template>
  <MainModal id="cart-modal" v-model="cartModal">
    <div class="cart-modal__inner">
      {{ products }}
    </div>
  </MainModal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      products: 'cart/getProducts',
    }),
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

<style scoped>
#cart-modal .modal-dialog {
  height: auto;
  margin: auto;
  align-items: center;
}

#cart-modal  .modal-site-inner {
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

<template>
  <MainModal
    id="order-modal"
    v-model="myOrderProductModal"
    :backdrop-closable="false"
  >
    <div class="order-modal__inner">
      <div>
        <div class="font-bold mb-5">{{ product.product_name }}</div>
      </div>
      <div class="flex justify between">
        <div>
          <img
            :src="product.product_image"
            :alt="product.product_name"
            class="w-32 mr-5"
          />
        </div>
        <div>
          <div>
            {{ $t('price') }}: {{ product.price | numberFilter }}
            {{ $t('sum') }}m
          </div>
          <div>{{ $t('amount') }}: {{ product.count }}</div>
          <div v-if="product.bonus_exist">
            {{ $t('bonusType') }}: {{ product.bonus_type }}
          </div>

          <div v-if="product.bonus_exist">
            {{ $t('bonus') }}: {{ product.bonus }}
          </div>
        </div>
      </div>
    </div>
  </MainModal>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    myOrderProductModal: {
      set(val) {
        this.$store.commit('modal/changeMyOrderProductModal', val)
      },
      get() {
        return this.$store.state.modal.myOrderProductModal
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

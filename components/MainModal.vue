// eslint-disable-next-line vue/multi-word-component-names
<template>
  <transition name="fade">
    <div>
      <div class="modal-backdrop"></div>
      <div :id="modalId" class="modal-content2">
        <div class="modal-dialog" @click.self="closeModalOverlay">
          <div class="modal-site-inner">
            <button
              v-if="closeIcon"
              class="modal-close-btn"
              @click="closeModal"
            >
              <fa :icon="['fas', 'xmark']" />
            </button>
            <slot name="modal_body"> </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    modalId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    closeModalOverlay() {},
    closeModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

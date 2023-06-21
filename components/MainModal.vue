<template>
  <transition name="fade">
    <div v-if="value">
      <div class="modal-backdrop" @click.self="handleBackdropClose"></div>
      <div :id="id" class="modal-content2" @click.self="handleBackdropClose">
        <div class="modal-dialog" @click.self="handleBackdropClose">
          <div class="modal-site-inner">
            <button
              v-if="closable"
              class="modal-close-btn"
              @click="$emit('input', false)"
            >
              <fa :icon="['fas', 'xmark']" />
            </button>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MainModal',
  props: {
    backdropClosable: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: true,
    },

    persistent: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  },
  emits: ['input'],
  methods: {
    handleClose() {
      this.$emit('input', false)
    },
    handleBackdropClose() {
      if (this.backdropClosable) this.$emit('input', false)
    },
  },
}
</script>
<style scoped>
.modal-backdrop {
  z-index: 1049;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
}
.modal-dialog {
  display: flex;
  -webkit-box-align: center;
  min-height: calc(100% - (0.5rem * 2));
  position: relative;
  z-index: 1050;
  width: 100%;
  align-items: center;
  margin: 0;
  /* height: 100%; */
}
.modal-site-inner {
  position: relative;
  background-color: #fff;
  z-index: 1050;
  width: 100%;
  margin: 0 auto;
  pointer-events: auto;
  border-radius: 10px;
  height: 100%;
}
@media (min-width: 576px) {
  .modal-dialog {
    min-height: calc(100% - (1.75rem * 2));
  }
}

.modal-close-btn {
  width: 32px;
  height: 32px;
  border: 1px solid red;
  background-color: red;
  border-radius: 50px;
  position: absolute;
  top: 15px;
  color: #ffffff;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal-content2 {
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1050;
  position: fixed;
  top: 0;
  right: 0;

  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  background-color: rgba(#000000, 0);
  transition: 0.2s linear transform;
}
</style>

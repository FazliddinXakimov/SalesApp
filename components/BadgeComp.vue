<template>
  <div class="text-white p-2 basket__count" :class="className">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.basket__count {
  align-items: center;
  background-color: #16a34a;
  /* border: 1px solid #fff; */
  border-radius: 50%;
  display: flex;
  font-size: 11px;
  height: 18px;
  justify-content: center;
  line-height: 13px;
  position: absolute;
  right: -10px;
  top: -6px;
  width: 18;
}
</style>

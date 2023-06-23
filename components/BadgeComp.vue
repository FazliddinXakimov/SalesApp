<template>
  <div class="text-xs font-medium px-1 py-0.5 rounded" :class="className">
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

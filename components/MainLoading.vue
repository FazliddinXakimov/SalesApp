<template>
  <div v-show="isLoading" class="loading-site-full">
    <div class="half-circle-spinner">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isMainLoading
    },
  },
}
</script>

<style lang="scss" src="@/assets/scss/MainLoading.scss"></style>

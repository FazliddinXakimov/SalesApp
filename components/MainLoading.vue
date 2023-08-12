<template>
  <div v-show="isLoading" class="loading-site-full">
    <div class="half-circle-spinner">
      <!-- <div class="circle circle-1"></div>
        
      <div class="circle circle-2"></div> -->
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] spin__color motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <!-- <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span
        > -->
      </div>
      <img src="@/assets/img/izlab.svg" class="w-16 h-10" />
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

<template>
  <div class="default__layout">
    <MainLoading />
    <HeaderTop />
    <HeaderMain />
    <Nuxt />
    <MobileBottomNavbar />
  </div>
</template>

<script>
import MainLoading from '../components/MainLoading.vue'
import MobileBottomNavbar from '@/components/Header/MobileBottomNavbar.vue'

export default {
  components: {
    HeaderMain: () => import('@/components/Header/HeaderMain.vue'),
    HeaderTop: () => import('@/components/Header/HeaderTop.vue'),
    MobileBottomNavbar,
    MainLoading,
  },
}
</script>

<style scoped>
.default__layout {
  background-color: #f6f9fc;
}
</style>

<template>
  <div class="default__layout">
    <MainLoading />
    <HeaderTop />
    <HeaderMain />
    <Nuxt />
    <MainFooter />
    <MobileBottomNavbar />
  </div>
</template>

<script>
import MainLoading from '../components/MainLoading.vue'
import MobileBottomNavbar from '@/components/Header/MobileBottomNavbar.vue'
import MainFooter from '@/components/MainFooter.vue'
export default {
  components: {
    HeaderMain: () => import('@/components/Header/HeaderMain.vue'),
    HeaderTop: () => import('@/components/Header/HeaderTop.vue'),
    MobileBottomNavbar,
    MainFooter,
    MainLoading,
  },
}
</script>

<style scoped>
.default__layout {
  background-color: #f6f9fc;
}
</style>

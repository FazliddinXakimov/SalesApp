<template>
  <div>
    <MainLoading />
    <HeaderTop />
    <HeaderMain />
    <div class="max-w-screen-xl mx-auto">
      <Nuxt />
    </div>
    <!-- <MainFooter /> -->
    <MobileBottomNavbar />
  </div>
</template>

<script>
import MainLoading from '@/components/MainLoading.vue'
import MobileBottomNavbar from '@/components/Header/MobileBottomNavbar.vue'
// import MainFooter from '@/components/MainFooter.vue'
export default {
  components: {
    HeaderMain: () => import('@/components/Header/HeaderMain.vue'),
    HeaderTop: () => import('@/components/Header/HeaderTop.vue'),
    MobileBottomNavbar,
    // MainFooter,
    MainLoading,
  },
}
</script>

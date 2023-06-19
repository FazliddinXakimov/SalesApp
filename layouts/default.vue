<template>
  <div class="defaultUI">
    <MainLoading />
    <HeaderTop />
    <HeaderMain />
    <TopCategories />
    <div class="max-w-screen-xl mx-auto">
      <Nuxt />
    </div>
    <!-- <MainFooter /> -->
    <MobileBottomNavbar />
  </div>
</template>

<script>
import TopCategories from '@/components/Header/TopCategories.vue'
import MainLoading from '@/components/MainLoading.vue'
import MobileBottomNavbar from '@/components/Header/MobileBottomNavbar.vue'
export default {
  components: {
    HeaderMain: () => import('@/components/Header/HeaderMain.vue'),
    HeaderTop: () => import('@/components/Header/HeaderTop.vue'),
    // MainFooter: () => import('@/components/MainFooter.vue'),
    MobileBottomNavbar,
    MainLoading,
    TopCategories,
  },
  middleware: 'cache-control',
}
</script>

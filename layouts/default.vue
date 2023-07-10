<template>
  <div class="defaultUI">
    <MainLoading />
    <HeaderTop />
    <HeaderMain />
    <CatalogTop />
    <div class="max-w-screen-xl mx-auto">
      <Nuxt />
    </div>
    <MainFooter />
    <MobileBottomNavbar />
  </div>
</template>

<script>
import CatalogTop from '@/components/Catalog/CatalogTop.vue'
import MainLoading from '@/components/MainLoading.vue'
import MobileBottomNavbar from '@/components/Header/MobileBottomNavbar.vue'
export default {
  components: {
    HeaderMain: () => import('@/components/Header/HeaderMain.vue'),
    HeaderTop: () => import('@/components/Header/HeaderTop.vue'),
    MainFooter: () => import('@/components/MainFooter.vue'),
    MobileBottomNavbar,
    MainLoading,
    CatalogTop,
  },
}
</script>

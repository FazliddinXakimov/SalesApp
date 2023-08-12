<template>
  <div class="defaultUI">
    <MainLoading />
    <HeaderTop />
    <HeaderMain />

    <CatalogTop />
    <div class="max-w-screen-xl mx-auto default_view__height px-3">
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

  head: {
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '@/assets/img/filter.svg',
      },
    ],
  },
}
</script>

<style scoped>
.default_view__height {
  min-height: 70vh;
}
</style>

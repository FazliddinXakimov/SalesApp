<template>
  <div>
    <HeaderTop />
    <HeaderMain />
    <Nuxt />
    <MobileBottomNavbar />
  </div>
</template>

<script>
import MobileBottomNavbar from '@/components/Header/MobileBottomNavbar.vue'

export default {
  components: {
    HeaderMain: () => import('@/components/Header/HeaderMain.vue'),
    HeaderTop: () => import('@/components/Header/HeaderTop.vue'),
    MobileBottomNavbar,
  },
}
</script>

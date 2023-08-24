<template>
  <div class="defaultUI">
    <MainLoading />
    <HeaderTop />
    <HeaderMain />

    <!-- <CatalogTop /> -->
    <TopCategoriesSwiper />
    <div class="max-w-screen-xl mx-auto default_view__height px-3">
      <Nuxt />
    </div>
    <MainFooter />
    <MobileBottomNavbar />
  </div>
</template>

<script>
import TopCategoriesSwiper from '@/components/Header/TopCategoriesSwiper.vue'
// import CatalogTop from '@/components/Catalog/CatalogTop.vue'
import MainLoading from '@/components/MainLoading.vue'

import MobileBottomNavbar from '@/components/Header/MobileBottomNavbar.vue'
export default {
  components: {
    HeaderMain: () => import('@/components/Header/HeaderMain.vue'),
    HeaderTop: () => import('@/components/Header/HeaderTop.vue'),
    MainFooter: () => import('@/components/MainFooter.vue'),
    MobileBottomNavbar,
    MainLoading,
    // CatalogTop,
    TopCategoriesSwiper,
  },
  beforeMount() {
    setTimeout(() => {
      // eslint-disable-next-line no-unused-expressions
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = '2.0'
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js'
      )
      // eslint-disable-next-line no-undef
      fbq('init', '1034942371015790')
      // eslint-disable-next-line no-undef
      fbq('track', 'PageView')
    }, 4000)
  },
}
</script>

<style scoped>
.default_view__height {
  min-height: 70vh;
}
</style>

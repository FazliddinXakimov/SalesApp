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
    <!-- <MainFooter /> -->
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
    // MainFooter: () => import('@/components/MainFooter.vue'),
    MobileBottomNavbar,
    MainLoading,
    // CatalogTop,
    TopCategoriesSwiper,
  },
  head: {
    // Add the noscript with the iframe to the head section
    script: [
      {
        innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]function(){(m[i].a=m[i].a[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(96733567, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        ecommerce:"dataLayer"
   });`,
        type: 'text/javascript',
      },
    ],

    noscript: [
      {
        innerHTML: `
        <noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=2140462536310884&ev=PageView&noscript=1"
/></noscript>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=378122538438757&ev=PageView&noscript=1"
/></noscript>
        <noscript><div><img src="https://mc.yandex.ru/watch/96733567" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJZKDXB9"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=781986203981553&ev=PageView&noscript=1"
/></noscript>
        `,
        type: 'text/html',
      },
    ],
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
      fbq('init', '781986203981553')
      // eslint-disable-next-line no-undef
      fbq('track', 'PageView')
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
      fbq('init', '378122538438757')
      // eslint-disable-next-line no-undef
      fbq(
        'track',
        'PageView'
      )(function (w, d, s, l, i) {
        w[l] = w[l] || []
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
        const f = d.getElementsByTagName(s)[0]
        const j = d.createElement(s)
        const dl = l !== 'dataLayer' ? '&l=' + l : ''
        j.async = true
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
        f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', 'GTM-PJZKDXB9')
    }, 4000)
  },
}
</script>

<style scoped>
.default_view__height {
  min-height: 70vh;
}
</style>

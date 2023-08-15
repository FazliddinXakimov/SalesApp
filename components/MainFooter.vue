<template>
  <footer class="text-white pb-24 768:text-sm text-xs main-footer">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
        <div>
          <h2 class="mb-6 font-semibold uppercase">{{ $t('socialMedia') }}</h2>
          <ul class="font-medium">
            <li class="mb-4">
              <a
                :href="footerData.youtube"
                target="_blank"
                class="flex items-center"
              >
                <img
                  src="@/assets/img/youtube.svg"
                  alt=""
                  class="768:w-10 768:h-10 w-6 h-6 mr-3"
                />
                <span>Youtube</span>
              </a>
            </li>
            <li class="mb-4">
              <a
                :href="footerData.instagram"
                target="_blank"
                class="flex items-center"
              >
                <img
                  src="@/assets/img/instagram.svg"
                  alt=""
                  class="768:w-10 768:h-10 w-6 h-6 mr-3"
                />
                <span>Instagram</span>
              </a>
            </li>
            <li class="mb-4">
              <a
                :href="footerData.facebook"
                target="_blank"
                class="flex items-center"
              >
                <img
                  src="@/assets/img/facebook.svg"
                  alt=""
                  class="768:w-10 768:h-10 w-6 h-6 mr-3"
                />
                <span>Facebook</span>
              </a>
            </li>
            <li class="mb-4">
              <a
                :href="footerData.telegram"
                target="_blank"
                class="flex items-center"
              >
                <img
                  src="@/assets/img/telegram.svg"
                  alt=""
                  class="768:w-10 768:h-10 w-6 h-6 mr-3"
                />
                <span>Telegram</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 font-semibold uppercase">{{ $t('download') }}</h2>

          <ul class="font-medium">
            <li class="mb-4">
              <a
                :href="footerData.google_play"
                target="_blank"
                class="flex items-center"
              >
                <img
                  src="@/assets/img/google-play.svg"
                  alt=""
                  class="768:w-10 768:h-10 w-6 h-6 mr-3"
                />
                <span>Google Play</span>
              </a>
            </li>
            <li class="mb-4">
              <a
                :href="footerData.app_store"
                target="_blank"
                class="flex items-center"
              >
                <img
                  src="@/assets/img/app-store.svg"
                  alt=""
                  class="768:w-10 768:h-10 w-6 h-6 mr-3"
                />
                <span>Google Play</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="mb-6 font-semibold uppercase">Business</h2>
          <ul class="font-medium">
            <li class="mb-4">
              <a
                :href="footerData.for_advertisers.url"
                target="_blank"
                class="hover:underline"
                >{{ footerData.for_advertisers.title }}</a
              >
            </li>

            <li class="mb-4">
              <nuxt-link
                :to="{ path: localePath('/sell-with-us') }"
                class="hover:underline"
                >{{ footerData.sell_with_us.title }}</nuxt-link
              >
            </li>

            <!-- <li class="mb-4">
              <a href="#"> +{{ footerData.support_phone }}</a>
            </li> -->
          </ul>
        </div>

        <div>
          <h2 class="mb-6 font-semibold uppercase">Legal</h2>
          <ul class="font-medium">
            <li class="mb-4">
              <nuxt-link
                :to="
                  localePath({
                    name: 'about-id',
                    params: { id: footerData.privacy_policy.slug },
                  })
                "
                class="hover:underline"
                >{{ footerData.privacy_policy.title }}</nuxt-link
              >
            </li>
            <li class="mb-4">
              <nuxt-link
                :to="
                  localePath({
                    name: 'about-id',
                    params: { id: footerData.public_offer.slug },
                  })
                "
                >{{ footerData.public_offer.title }}</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      footerData: 'references/GET_FOOTER',
    }),
  },
}
</script>

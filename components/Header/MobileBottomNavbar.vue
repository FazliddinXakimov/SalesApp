<template>
  <div class="md:hidden">
    <div
      class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200"
    >
      <div class="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          @click="$router.push(localePath('/'))"
        >
          <img src="@/assets/img/home.svg" class="h-6 w-6" />
          <span
            class="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 text-xs"
            >{{ $t('homePage') }}</span
          >
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          @click="catalogModal = true"
        >
          <img src="@/assets/img/catalog-mobile.svg" class="h-6 w-6" />
          <span
            class="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 text-xs"
            >{{ $t('category') }}</span
          >
        </button>

        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          @click="$router.push(localePath('/favorities'))"
        >
          <span class="relative">
            <img src="@/assets/img/favorite.svg" class="h-6 w-6" />

            <BadgeComp class-name="bg-green-600 absolute -top-2 -right-3">
              {{ totalFavoritiesCount }}
            </BadgeComp>
          </span>
          <span
            class="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 text-xs"
            >{{ $t('favorities') }}</span
          >
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          @click="$router.push(localePath('/cart'))"
        >
          <span class="relative">
            <img src="@/assets/img/shopping-cart.svg" class="h-6 w-6" />

            <BadgeComp class-name="bg-green-600 absolute -top-2 -right-3">
              {{ totalCartProductsCount }}
            </BadgeComp>
          </span>

          <span
            class="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 text-xs"
            @click="$router.push(localePath('/cart'))"
            >{{ $t('basket') }}</span
          >
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          @click="clickProfile"
        >
          <img src="@/assets/img/user.svg" class="h-6 w-6" />

          <span
            class="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 text-xs"
          >
            <p v-if="$auth.loggedIn">
              {{ $auth.user.phone }}
            </p>
            <p v-else>{{ $t('profil') }}</p>
          </span>
        </button>
      </div>
    </div>
    <LoginModal />
    <Catalog v-if="catalogModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    LoginModal: () => import('@/components/Modal/LoginModal.vue'),
    Catalog: () => import('@/components/Catalog/CatalogSidebar.vue'),
  },

  computed: {
    catalogModal: {
      set(val) {
        return this.$store.commit('modal/changeCatalogModal', val)
      },
      get() {
        return this.$store.state.modal.catalogModal
      },
    },

    ...mapGetters({
      totalCartProductsCount: 'cart/getTotalProductsCount',
      totalFavoritiesCount: 'favorities/getTotalCount',
    }),
  },
  methods: {
    clickProfile() {
      if (this.$auth.loggedIn) {
        this.$router.push(this.localePath('/profile'))
      } else {
        this.$store.commit('modal/changeLoginModal', true)
      }
    },
    openCartModal() {
      this.$store.commit('modal/changeCartModal', true)
    },
  },
}
</script>

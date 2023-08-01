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
          <img src="@/assets/img/home.svg" class="h-8 w-8" />
          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            >Home</span
          >
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          @click="catalogModal = true"
        >
          <img src="@/assets/img/catalog-mobile.svg" class="h-8 w-8" />
          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            >Catalog</span
          >
        </button>

        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          @click="$router.push(localePath('/favorities'))"
        >
          <img src="@/assets/img/favorite.svg" class="h-8 w-8" />
          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            >Favorites</span
          >
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          @click="$router.push(localePath('/cart'))"
        >
          <img src="@/assets/img/shopping-cart.svg" class="h-8 w-8" />
          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            @click="$router.push(localePath('/cart'))"
            >Shopping</span
          >
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          @click="clickProfile"
        >
          <img src="@/assets/img/user.svg" class="h-8 w-8" />

          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          >
            <p v-if="$auth.loggedIn">
              {{ $auth.user.phone }}
            </p>
            <p v-else>Profile</p>
          </span>
        </button>
      </div>
    </div>
    <LoginModal />
    <CartModal />
    <Catalog v-if="catalogModal" />
  </div>
</template>

<script>
export default {
  components: {
    LoginModal: () => import('@/components/Modal/LoginModal.vue'),
    CartModal: () => import('@/components/Modal/CartModal.vue'),
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

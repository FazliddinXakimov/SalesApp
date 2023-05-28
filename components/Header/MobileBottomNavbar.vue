<template>
  <div class="md:hidden">
    <div
      class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600"
    >
      <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <img src="@/assets/img/home.svg" class="h-8 w-8" />
          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            >Home</span
          >
        </button>

        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <img src="@/assets/img/love.svg" class="h-8 w-8" />
          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            >Favorites</span
          >
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          @click="openCartModal"
        >
          <img src="@/assets/img/shopping-cart.svg" class="h-8 w-8" />
          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            >Shopping</span
          >
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          @click="openLoginModal"
        >
          <img src="@/assets/img/user.svg" class="h-8 w-8" />

          <span
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            >Profile</span
          >
        </button>
      </div>
    </div>
    <LoginModal />
    <CartModal />
  </div>
</template>

<script>
export default {
  components: {
    LoginModal: () => import('@/components/Modal/LoginModal.vue'),
    CartModal: () => import('@/components/Modal/CartModal.vue'),
  },
  methods: {
    openLoginModal() {
      this.$store.commit('modal/changeLoginModal', true)
    },
    openCartModal() {
      this.$store.commit('modal/changeCartModal', true)
    },
  },
}
</script>

<template>
  <nav
    class="bg-gray-300 w-full top-8 left-0 border-b border-gray-200 sticky top-0 z-40"
  >
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <div class="768:flex hidden">
        <a href="https://flowbite.com/" class="flex items-center">
          <span class="self-center text-2xl font-semibold whitespace-nowrap"
            >Brand</span
          >
        </a>
      </div>

      <div class="flex justify-start items-center">
        <button
          class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 border-none rounded mr-2"
          @click="isOpenCatalog = !isOpenCatalog"
        >
          <fa :icon="['fas', `${getSelection}`]" />
          <span class="mx-3 hidden 1024:inline-block"> Catalog </span>
        </button>
        <div class="rounded-lg">
          <div class="w-full">
            <div class="relative search__input">
              <fa
                :icon="['fas', 'magnifying-glass']"
                class="absolute fa fa-search text-gray-400 top-4 left-4"
              />

              <input
                type="text"
                class="bg-white h-12 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
                name=""
              />
              <span class="absolute top-3 right-5 border-l pl-4">
                <fa
                  :icon="['fas', 'microphone']"
                  class="fa fa-microphone text-gray-500 hover:text-green-500 hover:cursor-pointer"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="768:flex item-center justify-between hidden">
        <button class="mr-10">
          <img src="@/assets/img/love.svg" class="h-8 w-8" />
        </button>

        <button class="mr-10" @click="openLoginModal">
          <img src="@/assets/img/user.svg" class="h-8 w-8" />
        </button>
        <button @click="openCartModal">
          <img src="@/assets/img/shopping-cart.svg" class="h-8 w-8" />
        </button>
      </div>
    </div>
    <LoginModal />
    <Catalog
      :category="isOpenCatalog"
      @openCatalog="isOpenCatalog = !isOpenCatalog"
    />
    <CartModal />
  </nav>
</template>

<script>
export default {
  components: {
    Catalog: () => import('@/components/Catalog/Catalog.vue'),
    LoginModal: () => import('@/components/Modal/LoginModal.vue'),
    CartModal: () => import('@/components/Modal/CartModal.vue'),
  },
  data() {
    return {
      isOpenCatalog: false,
    }
  },

  computed: {
    getSelection() {
      return this.isOpenCatalog ? 'xmark' : 'bars'
    },
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

<style scoped>
@media (min-width: 1024px) {
  .search__input {
    min-width: 500px;
  }
}
@media (min-width: 768px) {
  .search__input {
    min-width: 400px;
  }
}
</style>

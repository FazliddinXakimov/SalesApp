<template>
  <div>
    <nav
      class="bg-gray-300 w-full top-8 left-0 border-b border-gray-200 z-10 sticky"
    >
      <div
        class="max-w-screen-xl flex items-center justify-between mx-auto p-3"
      >
        <div class="768:flex hidden">
          <router-link to="/" class="flex items-center no-underline">
            <span class="text-2xl font-semibold whitespace-nowrap">Brand</span>
          </router-link>
        </div>

        <div class="flex justify-start items-center">
          <button
            class="bg-green-600 hover:bg-green-700 text-white font-bold catalog__btn px-4 border-none rounded mr-2"
            @click="catalogModal = true"
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
            <div class="flex flex-column justify-center items-center">
              <img src="@/assets/img/love.svg" class="h-8 w-8" />
              <span class="text-sm">Избранное </span>
            </div>
          </button>

          <button class="mr-10 dropdown__action">
            <div
              v-if="userIsLoggedIn"
              class="flex flex-column justify-center items-center"
            >
              <img src="@/assets/img/user.svg" class="h-8 w-8" />
              <span class="text-sm">Khakimov</span>
            </div>
            <div v-else class="flex flex-column justify-center items-center">
              <img
                src="@/assets/img/user.svg"
                class="h-8 w-8"
                @click="openLoginModal"
              />
              <span class="text-sm"> Войти </span>
            </div>
            <div v-if="userIsLoggedIn" class="dropdown__list">
              <nuxt-link class="dropdown__item" to="/profile"
                >Profile</nuxt-link
              >
              <button class="dropdown__item" @click="logout">Logout</button>
            </div>
          </button>
          <button @click="$router.push(localePath(`/cart`))">
            <div class="flex flex-column justify-center items-center">
              <span class="relative">
                <img src="@/assets/img/shopping-cart.svg" class="h-8 w-8" />
                <span class="badge badge-pill badge-success absolute -top-2">{{
                  totalCount
                }}</span>
              </span>
              <span class="text-sm"> Корзина </span>
            </div>
          </button>
        </div>
      </div>
    </nav>
    <Catalog
      :category="isOpenCatalog"
      @openCatalog="isOpenCatalog = !isOpenCatalog"
    />
    <LoginModal />
    <CartModal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userLogout } from '@/jwt/userData'

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
    ...mapGetters({
      totalCount: 'cart/getTotalProductsCount',
      userIsLoggedIn: 'auth/getUserIsLoggedIn',
    }),

    getSelection() {
      return this.isOpenCatalog ? 'xmark' : 'bars'
    },

    catalogModal: {
      set(val) {
        return this.$store.commit('modal/changeCatalogModal', val)
      },
      get() {
        return this.$store.state.modal.catalogModal
      },
    },
  },
  mounted() {},

  methods: {
    openLoginModal() {
      this.$store.commit('modal/changeLoginModal', true)
    },
    openCartModal() {
      this.$store.commit('modal/changeCartModal', true)
    },
    checkStatus() {
      this.$axios.patch(
        'http://8.219.111.206:8080/api/v1/references/brands/2/',
        {
          title: 'Samsung',
          icon: 'iconsumsung',
        }
      )
    },
    logout() {
      userLogout()
      this.$store.commit('auth/SET_LOGOUT')
      this.$router.push(this.localePath('/'))
    },
  },
}
</script>

<style lang="scss" src="@/assets/scss/DropDown.scss"></style>

<style scoped>
.catalog__btn {
  padding-top: 12px;
  padding-bottom: 12px;
}

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

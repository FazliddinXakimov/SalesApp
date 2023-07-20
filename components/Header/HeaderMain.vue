<template>
  <div>
    <nav id="header" class="bg-gray-300 w-full top-8 left-0 border-b z-20">
      <div
        class="max-w-screen-xl flex items-center justify-between mx-auto py-3"
      >
        <div class="768:flex hidden basis-1/6">
          <nuxt-link
            :to="{ path: localePath('/') }"
            class="flex items-center no-underline"
          >
            <span class="text-2xl font-semibold whitespace-nowrap">Brand</span>
          </nuxt-link>
        </div>

        <div class="flex justify-start items-center basis-4/6">
          <button
            class="flex justify-center items-center bg-green-600 hover:bg-green-700 text-white font-bold catalog__btn px-4 border-none rounded-lg mr-2"
            @click="catalogModal = true"
          >
            <img src="@/assets/img/catalog.svg" class="w-4 h-4 ml-3 mr-2" />
            <span class="mr-3 hidden 1024:inline-block"> Catalog </span>
          </button>

          <div class="relative w-full mr-10">
            <div class="rounded-lg">
              <div class="w-full">
                <div class="relative search__input">
                  <img
                    src="@/assets/img/search.svg"
                    class="w-4 h-4 absolute top-4 left-4"
                  />

                  <input
                    v-model="searchValue"
                    type="text"
                    class="bg-white h-12 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
                    name=""
                    @input="handleSearch"
                    @focus="isFocus = true"
                  />
                  <!-- @blur="isFocus = false" -->
                </div>
              </div>
            </div>
            <div
              v-if="isFocus && searchOptions.length > 0"
              class="absolute overflow-x-auto top-12 left-0 z-30 max-h-96 w-full overflow-scroll rounded-lg bg-white border border-neutral-light p-4 !pb-0 shadow-md max-laptop:!fixed"
            >
              <div v-if="searchCategoryOptions.length">
                <div class="text-lg font-bold">Category</div>
                <div
                  v-for="(category, index) in searchCategoryOptions"
                  :key="index"
                  class="flex justify-start items-center my-1 cursor-pointer"
                  @click="toCatalogPage(category)"
                >
                  <div>
                    {{ category.title }}
                  </div>
                </div>
              </div>
              <div v-if="searchProductsOptions.length">
                <div class="text-lg font-bold">Products</div>
                <div
                  v-for="(product, index) in searchProductsOptions"
                  :key="index"
                  class="flex justify-start items-center my-1 cursor-pointer"
                  @click="toDetailPage(product)"
                >
                  <img
                    :src="product.image"
                    :alt="product.title"
                    class="w-20 h-20 mr-2"
                  />
                  <div>
                    {{ product.id }}
                    {{ product.title }}
                  </div>
                </div>
              </div>
              <!-- {{ searchOptions }} -->
            </div>
          </div>
        </div>
        <div class="768:flex item-center justify-between hidden basis-1/6">
          <button
            class="mr-10"
            @click="$router.push(localePath(`/favorities`))"
          >
            <div class="flex flex-col justify-center items-center">
              <span class="relative">
                <img src="@/assets/img/favorite.svg" class="h-8 w-8" />

                <BadgeComp class-name="bg-green-600 absolute -top-2 -right-2">
                  {{ totalFavoritiesCount }}
                </BadgeComp>
              </span>

              <span class="text-sm">Избранное </span>
            </div>
          </button>

          <button class="mr-10 dropdown__action">
            <div
              v-if="userIsLoggedIn"
              class="flex flex-col justify-center items-center"
            >
              <img src="@/assets/img/user.svg" class="h-8 w-8" />
              <span class="text-sm">Khakimov</span>
            </div>
            <div v-else class="flex flex-col justify-center items-center">
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
            <div class="flex flex-col justify-center items-center">
              <span class="relative">
                <img src="@/assets/img/shopping-cart.svg" class="h-8 w-8" />

                <BadgeComp class-name="bg-green-600 absolute -top-2 -right-3">
                  {{ totalCartProductsCount }}
                </BadgeComp>
              </span>
              <span class="text-sm"> Корзина </span>
            </div>
          </button>
        </div>
      </div>
    </nav>
    <Catalog
      v-if="catalogModal"
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
import { variables } from '@/utils/constants'

export default {
  components: {
    Catalog: () => import('@/components/Catalog/CatalogSidebar.vue'),
    LoginModal: () => import('@/components/Modal/LoginModal.vue'),
    CartModal: () => import('@/components/Modal/CartModal.vue'),
  },
  data() {
    return {
      searchValue: '',
      isOpenCatalog: false,
      searchTimeout: null,
      searchOptions: [],
      searchCategoryOptions: [],
      searchProductsOptions: [],
      isFocus: false,
    }
  },

  computed: {
    ...mapGetters({
      totalCartProductsCount: 'cart/getTotalProductsCount',
      totalFavoritiesCount: 'favorities/getTotalCount',
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
  mounted() {
    // const h = document.querySelector('.header-height-copy')
    window.addEventListener('scroll', function (e) {
      const y = window.scrollY
      const header = document.getElementById('header')
      // console.log('header', header)

      if (header) {
        // console.log('console is identify')
        if (y > 200) {
          // h.style.display = 'block'
          header.classList.add('fixed')
          header.classList.remove('top-8')
          header.classList.add('top-0')
        } else {
          // h.style.display = 'none'
          header.classList.remove('fixed')
          header.classList.remove('top-0')
        }
      }
    })
  },

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

    handleSearch() {
      if (this.searchValue.length > 3) {
        clearTimeout(this.searchTimeout)

        this.searchTimeout = setTimeout(async () => {
          const response = await this.$axios.$get('/products/search/', {
            params: { query: this.searchValue },
          })
          this.searchOptions = response
          this.searchCategoryOptions = response.filter(
            (r) => r.type === variables.searchOptions.catalog
          )

          this.searchProductsOptions = response.filter(
            (r) => r.type === variables.searchOptions.product
          )
        }, 300)
      } else {
        this.searchOptions = []
        this.searchCategoryOptions = []
        this.searchProductsOptions = []
      }
    },
    logout() {
      userLogout()
      this.$store.dispatch('auth/LOGOUT')
      this.$router.push(this.localePath('/'))
    },

    toCatalogPage(catalog) {
      this.$router.push(
        this.localePath({
          name: `catalog-id`,
          params: { id: catalog.slug },
          query: { catalog: catalog.id },
        })
      )
      this.isFocus = false
    },

    toDetailPage(product) {
      this.$router.push(
        this.localePath({
          name: `product-id`,
          params: { id: product.id },
        })
      )
      this.isFocus = false
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

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
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

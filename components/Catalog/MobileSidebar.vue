<template>
  <transition name="fade">
    <div
      class="fixed top-0 left-0 h-full w-full bg-[#00000045] z-40 960:hidden"
    >
      <div class="flex h-full w-auto animate-slide-in z-50">
        <div
          class="flex flex h-full w-80 flex-col border-r border-secondary-light bg-white py-8 text-primary overflow-auto"
        >
          <div
            class="flex justify-center items-center px-4 border-b pb-2 text-base"
          >
            <img src="@/assets/img/logo.svg" class="w-10 h-8" />
          </div>
          <div
            v-if="$auth.loggedIn"
            class="flex justify-start items-center px-4 border-b py-2 text-base"
          >
            <div class="mr-4 border rounded-full p-3">
              <img src="@/assets/img/user.svg" class="h5 w-5" />
            </div>
            <div>
              <div class="font-bold">
                {{ $auth.user.name }}
              </div>
              <div>+-{{ $auth.user.phone }}</div>
            </div>
          </div>

          <div>
            <div
              class="flex items-center hover:bg-slate-200 group my-3 px-4 py-2 w-full"
              @click="catalogModal = true"
            >
              <img src="@/assets/img/catalog-mobile.svg" class="h-8 w-8 mr-4" />
              <span class="text-base font-bold">{{ $t('category') }}</span>
            </div>
            <div
              class="flex items-center hover:bg-slate-200 group my-3 px-4 py-2 w-full"
              @click="$router.push(localePath('/cart'))"
            >
              <span class="relative mr-4">
                <img src="@/assets/img/shopping-cart.svg" class="h-8 w-8" />

                <BadgeComp class-name="bg-green-600 absolute -top-2 -right-3">
                  {{ totalCartProductsCount }}
                </BadgeComp>
              </span>
              <span class="text-base font-bold">{{ $t('basket') }}</span>
            </div>
            <div
              class="flex items-center hover:bg-slate-200 group my-3 px-4 py-2 w-full"
              @click="$router.push(localePath('/favorities'))"
            >
              <span class="relative mr-4">
                <img src="@/assets/img/favorite.svg" class="h-8 w-8" />

                <BadgeComp class-name="bg-green-600 absolute -top-2 -right-3">
                  {{ totalFavoritiesCount }}
                </BadgeComp>
              </span>
              <span class="text-base font-bold">{{ $t('favorities') }}</span>
            </div>

            <div
              v-if="$auth.loggedIn"
              class="flex items-center hover:bg-slate-200 group my-3 px-4 py-2 w-full"
              @click="logout"
            >
              <img src="@/assets/img/logout.svg" class="h-8 w-8 mr-4" />
              <span class="text-base font-bold">{{ $t('logout') }}</span>
            </div>
          </div>
        </div>

        <span>
          <img
            src="@/assets/img/close.svg"
            width="20"
            height="20"
            class="cursor-pointer ml-1 mt-1"
            @click="mobileSidebar = false"
          />
        </span>
      </div>
    </div>
    <Catalog v-if="catalogModal" />
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MobileSidebar',
  components: {
    Catalog: () => import('@/components/Catalog/CatalogSidebar.vue'),
  },

  data() {
    return {
      isChildCategory: false,
    }
  },

  computed: {
    ...mapGetters({
      categories: 'references/GET_ROOT_CATEGORIES',
      totalCartProductsCount: 'cart/getTotalProductsCount',
      totalFavoritiesCount: 'favorities/getTotalCount',
    }),

    mobileSidebar: {
      set(val) {
        return this.$store.commit('modal/changeMobileSidebar', val)
      },
      get() {
        return this.$store.state.modal.mobileSidebar
      },
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

  methods: {
    ...mapActions('references', ['FETCH_ROOT_CATEGORIES']),
    logout() {
      this.$auth.logout()

      this.$router.push(this.localePath('/'))
    },
  },
}
</script>
<style src="@/assets/css/megaMenuCategory.css" scoped></style>

<template>
  <transition name="fade">
    <div class="fixed top-0 left-0 h-full w-full bg-[#00000045] z-40">
      <div class="flex h-full w-full animate-slide-in z-50">
        <div
          class="flex flex h-full w-80 flex-col border-r border-secondary-light bg-white py-8 text-primary overflow-auto"
        >
          <div class="p-4">
            <div class="text-lg font-bold mb-2">Цена</div>
            <div class="flex justify-between items-center">
              <div class="form-item mr-2">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="minPrice"
                >
                  от
                </label>
                <input
                  id="minPrice"
                  v-model="minPrice"
                  class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  @input="() => (page = 1)"
                />
              </div>
              <div class="form-item">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="maxPrice"
                >
                  до
                </label>
                <input
                  id="maxPrice"
                  v-model="maxPrice"
                  class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  max="100000"
                  @input="() => (page = 1)"
                />
              </div>
            </div>

            <div>
              <div class="text-lg font-bold mt-3 mb-2">Производитель</div>
            </div>
            <div>
              <div
                v-for="(producer, index) in producers"
                :key="index"
                class="flex justify-start items-center mb-2"
              >
                <div>
                  <input
                    type="checkbox"
                    :checked="isIncludes(producer.id)"
                    class="checkbox checkbox-secondary checkbox-lg w-5 h-5"
                    @change="handleCheckProducer(producer.id)"
                  />
                </div>
                <span class="text-lg ml-1">{{ producer.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <span>
          <img
            src="@/assets/img/close.svg"
            width="20"
            height="20"
            class="cursor-pointer ml-1 mt-1"
            @click="sellerFilterSidebar = false"
          />
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      producers: 'seller/GET_PRODUCERS',
      filter: 'seller/GET_FILTER',
      isIncludes: 'seller/IS_INCLUDES_BRAND',
    }),

    minPrice: {
      get() {
        return this.filter.minPrice
      },

      set(val) {
        this.$store.commit('seller/SET_FILTER_ITEM', {
          minPrice: val,
        })
        this.handleSetQuery({ minPrice: val })
      },
    },
    maxPrice: {
      get() {
        return this.filter.maxPrice
      },

      set(val) {
        this.$store.commit('seller/SET_FILTER_ITEM', {
          maxPrice: val,
        })

        this.handleSetQuery({ maxPrice: val })
      },
      page: {
        get() {
          return this.$store.getters['seller/GET_PAGE']
        },

        set(val) {
          this.$store.commit('seller/SET_PAGE', val)

          this.handleSetQuery({ page: val })
        },
      },
    },
    sellerFilterSidebar: {
      set(val) {
        return this.$store.commit('modal/changeSellerFilterSidebar', val)
      },
      get() {
        return this.$store.state.modal.sellerFilterSidebar
      },
    },
  },

  watch: {
    filter: {
      deep: true,
      handler(val, oldVal) {
        this.$store.commit('seller/SET_PAGE', 1)
        this.handleSetQuery({ page: 1 })
        this.$store.dispatch(
          'seller/FETCH_CATALOG_PRODUCTS',
          this.$route.params.id
        )
      },
    },
  },

  methods: {
    ...mapActions('references', ['FETCH_ROOT_CATEGORIES']),
    ...mapMutations('products', ['SET_NULL_PRODUCTS_LIST']),
    handleSetQuery(queryObject) {
      const oldRouteQuery = { ...this.$route.query }
      const routerQuery = {
        ...oldRouteQuery,
        ...this.filter,
        ...queryObject,
      }

      this.$router.replace({ query: { ...routerQuery } })
    },

    handleCheckProducer(id) {
      this.$store.commit('seller/SET_FILTER_BRANDS_ITEM', id)
      // this.handleSetQuery()
    },
  },
}
</script>
<style src="@/assets/css/megaMenuCategory.css" scoped></style>

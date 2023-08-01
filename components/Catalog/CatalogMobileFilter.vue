<template>
  <transition name="fade">
    <div class="fixed top-0 left-0 h-full w-full bg-[#00000045] z-40">
      <div class="flex h-full w-full animate-slide-in z-50">
        <div
          class="flex flex h-full w-80 flex-col border-r border-secondary-light bg-white py-8 text-primary overflow-auto"
        >
          <div class="p-4">
            <div class="text-lg font-bold mb-2">{{ $t('price') }}</div>
            <div class="flex justify-between items-center">
              <div class="form-item mr-2">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="minPrice"
                >
                  {{ $t('from') }}
                </label>
                <input
                  id="minPrice"
                  v-model="minPrice"
                  class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                />
              </div>
              <div class="form-item">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="maxPrice"
                >
                  {{ $t('to') }}
                </label>
                <input
                  id="maxPrice"
                  v-model="maxPrice"
                  class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  max="100000"
                />
              </div>
            </div>

            <div>
              <div class="text-lg font-bold mt-3 mb-2">{{ $t('brand') }}</div>
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
            @click="catalogFilterSidebar = false"
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
      producers: 'catalog/GET_PRODUCERS',
      filter: 'catalog/GET_FILTER',
      isIncludes: 'catalog/IS_INCLUDES_BRAND',
    }),

    minPrice: {
      get() {
        return this.filter.minPrice
      },

      set(val) {
        this.$store.commit('catalog/SET_FILTER_ITEM', {
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
        this.$store.commit('catalog/SET_FILTER_ITEM', {
          maxPrice: val,
        })

        this.handleSetQuery({ maxPrice: val })
      },
    },
    catalogFilterSidebar: {
      set(val) {
        return this.$store.commit('modal/changeCatalogFilterSiderbar', val)
      },
      get() {
        return this.$store.state.modal.catalogFilterSidebar
      },
    },
  },

  watch: {
    filter: {
      deep: true,
      handler(val, oldVal) {
        this.$store.dispatch(
          'catalog/FETCH_CATALOG_PRODUCTS',
          this.$route.query.catalog
        )
      },
    },
  },

  mounted() {
    this.$store.dispatch('catalog/FETCH_PRODUCERS')

    const routeQuery = this.$route.query

    if (routeQuery.brands) {
      const integerBrands = routeQuery.brands.map((brand) => parseInt(brand))

      this.$store.commit('catalog/SET_FILTER_ITEM', {
        brands: integerBrands,
      })
    }

    if (routeQuery.sort) {
      this.$store.commit('catalog/SET_FILTER_ITEM', {
        sort: routeQuery.sort,
      })
    }

    if (routeQuery.minPrice) {
      this.$store.commit('catalog/SET_FILTER_ITEM', {
        minPrice: routeQuery.minPrice,
      })
    }

    if (routeQuery.maxPrice) {
      this.$store.commit('catalog/SET_FILTER_ITEM', {
        maxPrice: routeQuery.maxPrice,
      })
    }
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
      this.$store.commit('catalog/SET_FILTER_BRANDS_ITEM', id)
      this.handleSetQuery()
    },
  },
}
</script>
<style src="@/assets/css/megaMenuCategory.css" scoped></style>

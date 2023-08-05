<template>
  <div>
    <BreadCrumb :bread-crumb="breadCrumb" class="my-10" />
    <div>
      <div class="flex 960:justify-end justify-start items-center mb-4">
        <div
          class="960:hidden flex justify-between items-center border border-gray-200 p-2.5 rounded-md mr-2 cursor-pointer"
          @click="catalogFilterSidebar = true"
        >
          <img src="@/assets/img/filter.svg" class="w-5 h-5" />
          <span class="ml-2">{{ $t('filter') }}</span>
        </div>
        <span class="960:w-64 w-48">
          <v-select
            v-model="sort"
            :options="filterOptions"
            :placeholder="$t('select')"
            :searchable="false"
            :reduce="(value) => value.key"
            label="title"
          />
        </span>
      </div>

      <div class="960:flex justify-between mb-10">
        <div class="960:basis-1/4 960:block hidden">
          <CatalogFilter />
        </div>
        <div class="960:basis-3/4">
          <div
            v-if="products.results.length > 0"
            class="grid 1024:grid-cols-4 768:grid-cols-3 grid-cols-2 gap-4"
          >
            <ProductCard
              v-for="(product, index) in products.results"
              :key="index"
              :product="product"
            />
          </div>

          <div v-else class="flex justify-center flex-col items-center mt-32">
            <img src="@/assets/img/empty-catalog.svg" class="h-36 w-36" />
            <div class="font-medium text-lg">
              {{ $t('emptyCategory') }}
            </div>
            <button
              class="bg-transparent text-green-500 border border-green-500 hover:bg-green-500 hover:text-white py-2 px-4 rounded mt-5"
              @click="$router.push(localePath('/'))"
            >
              {{ $t('homePage') }}
            </button>
          </div>
          <div class="mt-10">
            <GlobalPagination
              :total-count="products.count"
              :page="page"
              :page-size="pageSize"
              @onPaginate="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
    <CatalogMobileFilter v-if="catalogFilterSidebar" />
  </div>
</template>

<script>
import vSelect from 'vue-select'
import GlobalPagination from '@/components/GlobalPagination.vue'
import CatalogFilter from '@/components/Catalog/CatalogFilter.vue'
import CatalogMobileFilter from '@/components/Catalog/CatalogMobileFilter.vue'

export default {
  name: 'CatalogDetails',
  components: {
    GlobalPagination,
    vSelect,
    CatalogFilter,
    CatalogMobileFilter,
  },
  data() {
    return {
      breadCrumb: [
        {
          title: 'Catalog',
        },
      ],

      sort: null,

      filterOptions: [
        {
          title: 'Hammasi',
          key: '',
        },
        {
          title: 'Arzonroq',
          key: 'price_asc',
        },
        {
          title: 'Qimmatroq',
          key: 'price_desc',
        },
        {
          title: 'Reytingi yuqori',
          key: 'rating_desc',
        },
        {
          title: "Ko'p buyurtirilgan",
          key: 'orders_number_desc',
        },
      ],
    }
  },

  computed: {
    products() {
      return this.$store.getters['catalog/GET_PRODUCTS']
    },

    pageSize() {
      return this.$store.getters['catalog/GET_FILTER'].page_size
    },

    catalogFilterSidebar: {
      set(val) {
        return this.$store.commit('modal/changeCatalogFilterSiderbar', val)
      },
      get() {
        return this.$store.state.modal.catalogFilterSidebar
      },
    },
    page: {
      get() {
        return this.$store.getters['catalog/GET_FILTER'].page
      },

      set(val) {
        this.$store.commit('catalog/SET_FILTER_ITEM', {
          page: val,
        })

        this.handleSetQuery({ page: val })
      },
    },

    sortType: {
      get() {
        return this.$store.getters['catalog/GET_FILTER']
      },

      set(val) {
        this.$store.commit('catalog/SET_FILTER_ITEM', {
          sort: val,
        })
        this.handleSetQuery({ sort: val })
      },
    },
  },

  watch: {
    sort(val) {
      if (val) {
        this.sortType = val
      }
    },
  },

  mounted() {
    this.$store.dispatch(
      'catalog/FETCH_CATALOG_PRODUCTS',
      this.$route.query.catalog
    )
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
    if (routeQuery.page) {
      const pageNumber = routeQuery.page / 1
      console.log('pageNumber', typeof pageNumber)
      // this.page = pageNumber
    }
  },
  methods: {
    handleSetQuery(queryObject) {
      const oldRouteQuery = { ...this.$route.query }
      const routerQuery = {
        ...oldRouteQuery,
        ...this.filter,
        ...queryObject,
      }

      this.$router.replace({ query: { ...routerQuery } })
    },

    handlePageChange(page) {
      this.page = page
      // this.handleSetQuery()
    },
  },
}
</script>

<style lang="scss" scoped src="@/assets/scss/Catalog.scss"></style>

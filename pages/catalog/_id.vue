<template>
  <div>
    <BreadCrumb :bread-crumb="breadCrumb" class="mb-10" />
    <div v-if="products.results.length > 0">
      <div class="flex justify-start mb-5"></div>
      <div class="flex justify-end items-center mb-4">
        <span class="w-64">
          <multiselect
            v-model="sort"
            class="multiselect__input"
            :options="filterOptions"
            label="title"
            track-by="key"
            :searchable="true"
            :show-labels="false"
            :allow-empty="false"
            :close-on-select="true"
            :placeholder="$t('Select')"
          ></multiselect>
        </span>
      </div>
      <div class="flex justify-between">
        <div class="basis-1/4">
          <CatalogFilter />
        </div>
        <div class="basis-3/4">
          <div class="grid grid-cols-4 gap-4">
            <ProductCard
              v-for="(product, index) in products.results"
              :key="index"
              :product="product"
            />
          </div>
        </div>
      </div>

      <div>
        <GlobalPagination
          :total-count="products.count"
          :page="page"
          :page-size="pageSize"
          @onPaginate="handlePageChange"
        />
      </div>
    </div>
    <div v-else class="flex justify-center flex-col items-center mt-32">
      <img src="@/assets/img/empty-catalog.svg" class="h-36 w-36" />
      <div class="font-medium text-lg">
        Unfortunately, there are currently no products in this category
      </div>
      <button
        class="bg-transparent text-green-500 border border-green-500 hover:bg-green-500 hover:text-white py-2 px-4 rounded mt-5"
        @click="$router.push(localePath('/'))"
      >
        Go To Home
      </button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import GlobalPagination from '@/components/GlobalPagination.vue'

export default {
  name: 'CatalogDetails',
  components: {
    Multiselect,
    GlobalPagination,
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
        this.sortType = val.key
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped src="@/assets/scss/Catalog.scss"></style>
<!-- <style>
.multiselect__tags {
  border: 1px solid #6b7280 !important;
}
</style> -->

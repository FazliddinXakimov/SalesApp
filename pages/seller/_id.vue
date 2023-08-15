<template>
  <div>
    <BreadCrumb :bread-crumb="breadCrumb" class="my-10" />

    <div class="flex justify-center text-xl font-bold my-10">
      {{ products.seller_data.title }}
    </div>
    <div>
      <div class="flex 960:justify-end justify-start items-center mb-4">
        <div
          class="960:hidden flex justify-between items-center border border-gray-200 p-2.5 rounded-md mr-2 cursor-pointer"
          @click="sellerFilterSidebar = true"
        >
          <img src="@/assets/img/filter.svg" class="w-5 h-5" />
          <span class="ml-2">Filter</span>
        </div>
        <span class="960:w-64 w-48">
          <v-select
            v-model="sortType"
            :options="filterOptions"
            :placeholder="$t('select')"
            :reduce="(value) => value.key"
            :searchable="false"
            label="title"
          />
        </span>
      </div>
      <div class="960:flex justify-between mb-10">
        <div class="960:basis-1/4 960:block hidden">
          <SellerFilter />
        </div>
        <div class="960:basis-3/4">
          <div
            v-if="products.results.length > 0"
            class="grid 1024:grid-cols-4 768:grid-cols-3 640:grid-cols-2 grid-cols-1 gap-4"
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
    <SellerMobileFilter v-if="sellerFilterSidebar" />
  </div>
</template>

<script>
import vSelect from 'vue-select'
import GlobalPagination from '@/components/GlobalPagination.vue'
import SellerFilter from '@/components/Seller/SellerFilter.vue'
import SellerMobileFilter from '@/components/Seller/SellerMobileFilter.vue'

export default {
  name: 'CatalogDetails',
  components: {
    GlobalPagination,
    vSelect,
    SellerFilter,
    SellerMobileFilter,
  },
  data() {
    return {
      breadCrumb: [
        {
          title: this.$t('storePage'),
        },
      ],

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
      return this.$store.getters['seller/GET_PRODUCTS']
    },

    pageSize() {
      return this.$store.getters['seller/GET_FILTER'].page_size
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

    sellerFilterSidebar: {
      set(val) {
        return this.$store.commit('modal/changeSellerFilterSidebar', val)
      },
      get() {
        return this.$store.state.modal.sellerFilterSidebar
      },
    },

    sortType: {
      get() {
        return this.$store.getters['seller/GET_FILTER'].sort
      },

      set(val) {
        this.$store.commit('seller/SET_FILTER_ITEM', {
          sort: val,
        })
        this.page = 1
        this.handleSetQuery({ sort: val, page: 1 })
      },
    },
  },

  mounted() {
    // console.log('this.$route', this.$route)

    const routeQuery = this.$route.query
    if (routeQuery.brands) {
      let integerBrands

      if (routeQuery.brands.length > 1)
        integerBrands = routeQuery.brands.map((brand) => parseInt(brand))
      else integerBrands = routeQuery.brands

      this.$store.commit('seller/SET_FILTER_ITEM', {
        brands: integerBrands,
      })
    }

    if (routeQuery.sort) {
      this.$store.commit('seller/SET_FILTER_ITEM', {
        sort: routeQuery.sort,
      })
    }

    if (routeQuery.minPrice) {
      this.$store.commit('seller/SET_FILTER_ITEM', {
        minPrice: routeQuery.minPrice,
      })
    }

    if (routeQuery.maxPrice) {
      this.$store.commit('seller/SET_FILTER_ITEM', {
        maxPrice: routeQuery.maxPrice,
      })
    }

    if (routeQuery.page) {
      const pageNumber = routeQuery.page / 1
      this.page = pageNumber
    }

    this.$store.dispatch('seller/FETCH_SELLER_PRODUCTS', this.$route.params.id)
    this.$store.dispatch('seller/FETCH_PRODUCERS')
  },
  methods: {
    async handleSetQuery(queryObject) {
      const oldRouteQuery = { ...this.$route.query }
      const routerQuery = {
        ...oldRouteQuery,
        ...this.filter,
        ...queryObject,
      }

      this.$router.replace({ query: { ...routerQuery } })
      await this.$store.dispatch(
        'seller/FETCH_SELLER_PRODUCTS',
        this.$route.params.id
      )
    },

    handlePageChange(page) {
      this.page = page
      this.$store.dispatch(
        'seller/FETCH_SELLER_PRODUCTS',
        this.$route.params.id
      )
      // this.handleSetQuery()
    },
  },
}
</script>

<style lang="scss" scoped src="@/assets/scss/Catalog.scss"></style>

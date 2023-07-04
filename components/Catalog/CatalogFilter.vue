<template>
  <div>
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
        />
      </div>
    </div>
    <!-- <vue-slider
      ref="range_slider"
      v-model="localPriceRange"
      :tooltip="'none'"
      :min="0"
      :max="10000000"
      :interval="1"
      @change="handleDrag"
    >
    </vue-slider> -->
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

    <!-- v-if="products && products.length" -->
  </div>
</template>

<script>
// import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
// import 'vue-slider-component/dist-css/vue-slider-component.css'
import { mapGetters } from 'vuex'

export default {
  components: {
    // VueSlider,
  },
  data() {
    return {
      initialPriceRange: [0, 10000000],
    }
  },
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
  },

  watch: {
    filter: {
      deep: true,
      handler() {
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

<style lang="scss" src="@/assets/scss/CatalogFilter.scss"></style>

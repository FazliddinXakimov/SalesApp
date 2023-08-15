<template>
  <div class="ml-r border p-4 rounded-xl mr-5">
    <div class="text-xl font-bold text-center mb-4">
      {{ $t('filter') }}
    </div>
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
          @input="() => (page = 1)"
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
          @input="() => (page = 1)"
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    // VueSlider,
  },
  data() {
    return {}
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
        this.page = 1
        this.handleSetQuery({ minPrice: val, page: 1 })
        this.$store.dispatch(
          'catalog/FETCH_CATALOG_PRODUCTS',
          this.$route.query.catalog
        )
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
        this.page = 1
        this.handleSetQuery({ maxPrice: val, page: 1 })
        this.$store.dispatch(
          'catalog/FETCH_CATALOG_PRODUCTS',
          this.$route.query.catalog
        )
      },
    },

    page: {
      get() {
        return this.$store.getters['catalog/GET_PAGE']
      },

      set(val) {
        this.$store.commit('catalog/SET_PAGE', val)

        this.handleSetQuery({ page: val })
      },
    },
  },

  methods: {
    handleSetQuery(queryObject = {}) {
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
      this.page = 1
      this.handleSetQuery({
        brand: id,
        page: 1,
      })
      this.$store.dispatch(
        'catalog/FETCH_CATALOG_PRODUCTS',
        this.$route.query.catalog
      )
    },
  },
}
</script>

<style lang="scss" src="@/assets/scss/CatalogFilter.scss"></style>

<template>
  <div>
    <div class="flex justify-center">
      <div class="text-2xl">SmartPhones</div>
    </div>
    <div class="flex justify-end items-center">
      <span>
        <multiselect
          v-model="filter.type"
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
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'CatalogDetails',
  components: {
    Multiselect,
  },
  data() {
    return {
      filter: {
        type: '',
      },
      filterOptions: [
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
  },

  mounted() {
    // console.log('this.rotue', this.$route)
    this.$store.dispatch(
      'catalog/FETCH_CATALOG_PRODUCTS',
      this.$route.query.catalog
    )
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
.form-select {
  width: 100%;
  margin-bottom: 28px;
  position: relative;
  select {
    width: 100%;
    height: 44px;
    border-radius: 6px;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    padding: 0 17px;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.1641 4.78625L7.50598 9.44434L2.83073 4.76908' stroke='%23333333' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: 99% center;
    box-shadow: 0 0 0 1px #d5d8df;
  }
  .label {
    color: #767676;
    position: absolute;
    left: 13px;
    padding: 0px 4px 0px 4px;
    background: #fff;
    top: -8px;
    font-size: 12px;
  }
}
</style>

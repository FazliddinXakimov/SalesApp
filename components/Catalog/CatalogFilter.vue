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
          v-model="filter.minPrice"
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
          v-model="filter.maxPrice"
          class="appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
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
        <div @click="handleToggleAllProductSelection">
          <input
            type="checkbox"
            :checked="producer.checked"
            class="checkbox checkbox-secondary checkbox-lg w-5 h-5"
          />
        </div>
        <span class="text-lg ml-1">{{ producer.title }}</span>
      </div>
    </div>

    <!-- v-if="products && products.length" -->
    <!-- <vue-slider
      ref="range_slider"
      v-model="localPriceRange"
      :tooltip="'none'"
      :min="0"
      :max="2000"
      :interval="1000"
      @change="handleDrag"
    >
    </vue-slider> -->
  </div>
</template>

<script>
// import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import { mapGetters } from 'vuex'

export default {
  components: {
    // VueSlider,
  },
  data() {
    return {
      localPriceRange: [0, 200],
      filter: {
        minPrice: 0,
        maxPrice: 200,
      },
    }
  },
  computed: {
    ...mapGetters({
      producers: 'catalog/GET_PRODUCERS',
    }),
  },

  mounted() {
    this.$store.dispatch('catalog/FETCH_PRODUCERS')
  },
}
</script>

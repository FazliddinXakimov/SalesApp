<template>
  <div>
    <div v-for="(data, index) in allProducts" :key="index" class="mt-16">
      <h1 class="960:text-2xl mb-4 768:text-xl font-bold text-lg">
        {{ data.title }}
      </h1>

      <div
        class="grid 1024:grid-cols-5 768:grid-cols-4 640:grid-cols-3 grid-cols-2 960:gap-4 gap-x-2 gap-y-3"
      >
        <ProductCard
          v-for="(product, ind) in data.products"
          :key="ind"
          :product="product"
        />
      </div>
      <div v-if="data.inline_banner" class="mt-16">
        <img
          :src="data.inline_banner.image"
          class="w-full cursor-pointer"
          @click="$emit('handleClickBanner', data.inline_banner)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/Product/ProductCard.vue'

export default {
  components: {
    ProductCard,
  },

  props: {
    allProducts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

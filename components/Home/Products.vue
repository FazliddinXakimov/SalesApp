<template>
  <div>
    <div v-for="(data, index) in allProducts" :key="index" class="mt-16">
      <h1 class="text-2xl mb-4">
        {{ data.title }}
      </h1>

      <div class="grid 1024:grid-cols-5 768:grid-cols-4 grid-cols-2 gap-4">
        <ProductCard
          v-for="(product, ind) in data.products"
          :key="ind"
          :product="product"
        />
      </div>
      <div v-if="data.inline_banner" class="mt-16">
        <img
          :src="data.inline_banner.image"
          class="w-full h-96 cursor-pointer"
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

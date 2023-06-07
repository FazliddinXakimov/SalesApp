<template>
  <div>
    <!-- <HomeSliders :sliders="sliders" /> -->
    <div class="max-w-screen-xl mx-auto">
      <Banner />

      <!-- {{ allProducts }} -->
      <!-- <ProductCard /> -->
      <div v-for="(data, index) in allProducts" :key="index" class="mt-16">
        <h1 class="text-2xl mb-4">
          {{ data.title.ru }}
        </h1>
        <div class="flex justify-start items-center">
          <ProductCard
            v-for="(product, ind) in data.products"
            :key="ind"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Banner from '@/components/Home/Banner.vue'
import ProductCard from '@/components/Product/ProductCard.vue'

export default {
  name: 'IndexPage',
  components: { Banner, ProductCard },
  data() {
    return {
      banners: [
        {
          id: 1,
          img: '@/assets/img/cars.jpg',
          title: 'cars',
        },
        {
          id: 2,
          img: '@/assets/img/default.jpg',
          title: 'default',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      allProducts: 'home/getMainPageProducts',
    }),
  },

  mounted() {
    this.$store.dispatch('home/fetchMainProducts')
  },
}
</script>

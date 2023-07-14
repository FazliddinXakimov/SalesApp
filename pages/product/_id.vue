<template>
  <div class="mt-5">
    <BreadCrumb :bread-crumb="breadCrumb" class="mb-10" />
    <ProductDetailMainSection :product="product" />
    <ProductDetailTabs :product="product" />
    <SimilarProducts :products="similarProducts" class="mt-5 mb-10" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SimilarProducts from '@/components/Product/SimilarProducts.vue'
import ProductDetailMainSection from '@/components/Product/ProductDetailMainSection.vue'
import ProductDetailTabs from '@/components/Product/ProductDetailTabs.vue'

export default {
  components: {
    ProductDetailMainSection,
    ProductDetailTabs,
    SimilarProducts,
  },
  data() {
    return {
      breadCrumb: [
        {
          title: 'Product',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      product: 'product-detail/GET_PRODUCT',
      similarProducts: 'product-detail/GET_SIMILAR_PRODUCTS',
    }),
  },

  async mounted() {
    await this.$store.dispatch(
      'product-detail/FETCH_PRODUCT_DETAIL',
      this.$route.query.id
    )
    await this.$store.dispatch(
      'product-detail/FETCH_PRODUCT_SIMILAR_PRODUCTS',
      this.product.category.id
    )
  },
}
</script>

<template>
  <div class="mt-5">
    <BreadCrumb :bread-crumb="breadCrumb" />
    <div class="flex justify-between">
      <b-col class="768:basis-1/12 firstCol">
        <b-img
          v-for="(items, indexPro) in product.images"
          :key="indexPro"
          :src="items"
          :alt="items"
          class="activeListImage"
          @click="() => {}"
        />
      </b-col>
      <div class="w-full 768:basis-1/3 text-center mainProductDiv">
        <div class="pro__card position-relative">
          <div style="margin-top: 80px" class="setterImg">
            <img
              v-if="product.main_image"
              class="w-100 manImgProduct"
              :src="product.main_image"
              zoom-type="hover"
              :fullscreen-on-mobile="true"
              :zoom-scale="0.7"
              :zoom-preload="true"
            />
            <b-img
              v-if="!defaultImg"
              class="w-100"
              :src="require('@/assets/img/cart.svg')"
            />
          </div>
        </div>
      </div>
      <div class="768:basis-7/12 pl-4">
        <div class="text-xl mb-4">{{ product.title }}</div>
        <div class="text-lg">Brand: {{ product.brand.title }}</div>

        <div v-for="(item, index) in product.properties" :key="index">
          {{ item }}
        </div>

        <div class="text-2xl mb-4">
          {{ product.sale_price | numberFilter }} sum
        </div>
        <div>
          <span> Delivery: </span>
          <span v-if="!product.free_delivery">
            {{ product.delivery_price | numberFilter }} sum
          </span>
          <span v-else> Free </span>
        </div>

        <button
          class="flex justify-center items-center w-full my-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 hover:text-green-600 rounded"
        >
          <img src="@/assets/img/cart.svg" class="w-5 h-5 mr-1 text-white" />
          Добавить в корзину
        </button>
        <button
          class="flex justify-center items-center w-full my-1 bg-white hover:bg-gray-50 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
        >
          <img src="@/assets/img/cart.svg" class="w-5 h-5 mr-1" />
          Купить в один клик
        </button>
      </div>
    </div>

    <pre>
       {{ product }}
    </pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      defaultImg: '@/assets/img/cart.svg',
      breadCrumb: [
        {
          title: 'Product',
          // link: '/cart',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      product: 'product-detail/getProduct',
    }),
  },

  mounted() {
    this.$store.dispatch(
      'product-detail/FETCH_PRODUCT_DETAIL',
      this.$route.params.id
    )
  },
}
</script>

<style>
#swal2-title {
  font-size: 29px;
  font-weight: 400;
}

.img-default-size {
  height: 200px;
  transition: all 0.2s;
}

.img-enlarged-size {
  height: 400px;
  transition: all 0.2s;
}

.np-credits {
  font-size: 12px;
  margin-bottom: 12px;
  color: #4b4b4b;
}

.list_bread {
  list-style: none;
  padding-left: 0;
}

.list_bread > li {
  display: inline;
}

.bg__danger__main {
  background: #f44336 !important;
  border-radius: 16px;
  color: #ffffff;
  letter-spacing: 0.16px;
  padding: 2px;
  font-weight: 400;
  font-size: 13px;
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
}

.success__badge__main {
  background: #4caf50;
  color: #ffffff;
  letter-spacing: 0.16px;
  padding: 2px;
  font-weight: 400;
  font-size: 13px;
  width: 110px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
}

.list_bread > li > a {
  color: grey !important;
  font-size: 14px !important;
  cursor: pointer !important;
}

.list_bread > li:after {
  content: ' » ';
  display: inline;
  font-size: 0.9em;
  color: #aaa;
  padding: 0 0.0725em 0 0.15em;
}

.list_bread > li:last-child:after {
  content: '';
}

.list_bread > li a.nuxt-link-exact-active.nuxt-link-active {
  color: grey;
  font-size: 14px;
}

.textGrey {
  color: grey;
  font-size: 14px;
}

.activeListImage {
  border: 2px solid var(--yellow-color) !important;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
}
</style>

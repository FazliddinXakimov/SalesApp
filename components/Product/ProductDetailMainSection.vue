<template>
  <div class="flex justify-between">
    <div class="768:basis-4/12">
      <ProductImages :images="product.images" :name="product.title" />
    </div>

    <div class="768:basis-4/12 pl-4">
      <div class="text-xl mb-4">{{ product.title }}</div>
      <div v-if="product && product.brand" class="text-lg mb-4">
        {{ product.brand.title }}
      </div>

      <div class="text-lg mt-10 mb-5">Характеристики:</div>
      <ul class="list-disc">
        <li
          v-for="(item, index) in product.properties"
          :key="index"
          class="ml-4"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="768:basis-4/12">
      <div class="border rounded-md p-4">
        <div>
          <span> Total Price: </span>
          <span class="font-bold">
            {{ (product.sale_price + product.delivery_price) | numberFilter }}
            sum
          </span>
        </div>
        <div>
          Product price:
          <span class="font-bold"
            >{{ product.sale_price | numberFilter }} sum
          </span>
        </div>

        <div>
          <span> Delivery: </span>
          <span v-if="!product.free_delivery" class="font-bold">
            {{ product.delivery_price | numberFilter }} sum
          </span>
          <span v-else class="font-bold"> Free </span>
        </div>

        <div class="mt-5">
          <button
            v-if="isCart"
            class="my-1 w-full mr-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 hover rounded"
            @click="$router.push(localePath('/cart'))"
          >
            Перейти в корзину
          </button>
          <button
            v-else
            class="my-1 w-full mr-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 border border-green-500 hover rounded"
            @click="addProductToCart"
          >
            Добавить в корзину
          </button>

          <button
            class="my-1 w-full bg-white hover:bg-gray-50 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
            @click="buyOneClickModal = true"
          >
            Купить в один клик
          </button>
        </div>
      </div>
    </div>

    <BuyOneClickModal :product="product" />
  </div>
</template>

<script>
import BuyOneClickModal from '@/components/Product/BuyOneClickModal.vue'
import ProductImages from '@/components/Product/ProductImages.vue'

export default {
  components: {
    BuyOneClickModal,
    ProductImages,
  },

  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    isCart() {
      return this.$store.state.cart.product_ids.includes(this.product.id)
    },

    buyOneClickModal: {
      set(val) {
        this.$store.commit('modal/changeBuyOneClickModal', val)
      },
      get() {
        return this.$store.state.modal.buyOneClickModal
      },
    },
  },
  methods: {
    addProductToCart() {
      this.$store.commit('cart/ADD_PRODUCT', this.product)
    },
    identifyImage(media) {
      if (media) {
        const imageExtensions = ['.gif', '.jpg', '.jpeg', '.png']

        const mediaType = media.slice(media.lastIndexOf('.'))
        return imageExtensions.includes(mediaType)
      }
    },
    handleSelectMedia(media) {
      this.$emit('handleSelectMedia', media)
    },
  },
}
</script>

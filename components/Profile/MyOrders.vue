<template>
  <!-- component -->
  <div>
    <div class="relative overflow-x-auto">
      <table class="min-w-max w-full table-auto">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">{{ $t('product') }}</th>
            <th class="py-3 px-6 text-center">{{ $t('createdDate') }}</th>
            <th class="py-3 px-6 text-center">{{ $t('status') }}</th>
            <th class="py-3 px-6 text-center">{{ $t('deliveryPrice') }}</th>
            <th class="py-3 px-6 text-center">{{ $t('discount') }}</th>
            <th class="py-3 px-6 text-center">{{ $t('totalPrice') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="(order, index) in orders"
            :key="index"
            class="border-b border-gray-200"
          >
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <div class="flex mb-5 -space-x-4">
                  <img
                    v-for="(product, ind) in order.products"
                    :key="ind"
                    class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 cursor-pointer"
                    :src="product.product_image"
                    :alt="product.product_name"
                    @click="setSelectProduct(product)"
                  />
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <span>{{ order.created_at | formatDateTime }}</span>
              </div>
            </td>

            <td class="py-3 px-6 text-center">
              <span class="text-purple-600 py-1 px-3 rounded-full text-xs">{{
                order.status
              }}</span>
            </td>
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <span
                  >{{ order.delivery_price | numberFilter }}
                  {{ $t('sum') }}</span
                >
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <span
                  >{{ order.discount_amount | numberFilter }}
                  {{ $t('sum') }}</span
                >
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <span
                  >{{ order.total_price | numberFilter }} {{ $t('sum') }}</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <MyOrderProductModal :product="selectProduct" />
  </div>
</template>

<script>
import MyOrderProductModal from './MyOrderProductModal.vue'
export default {
  components: {
    MyOrderProductModal,
  },
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectProduct: {},
    }
  },
  computed: {
    myOrderProductModal: {
      set(val) {
        this.$store.commit('modal/changeMyOrderProductModal', val)
      },
      get() {
        return this.$store.state.modal.myOrderProductModal
      },
    },
  },
  methods: {
    setSelectProduct(product) {
      this.selectProduct = product
      this.myOrderProductModal = true
    },
  },
}
</script>

<template>
  <div class="768:basis-2/3">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="border-b border-secondary-light py-4 max-tablet:py-2"
      :class="{
        'border-t border-secondary-light': index === 0,
      }"
    >
      <div
        class="flex items-center gap-8 max-tablet:items-start max-tablet:gap-4"
      >
        <div class="flex gap-3 items-center justify-center">
          <!-- <div @click="handleToggleProductSelection(product.id)">
            <input
              :checked="product.selected"
              type="checkbox"
              class="checkbox checkbox-secondary checkbox-lg w-5 h-5"
            />
          </div> -->
          <div
            class="flex h-[88px] w-[88px] items-center justify-center max-tablet:h-[110px] max-tablet:w-[110px]"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="aspect-w-1 aspect-h-1 rounded-lg object-contain max-tablet:h-[110px] max-tablet:w-[110px]"
              loading="lazy"
              width="88"
              height="88"
              decoding="async"
            />
          </div>
        </div>
        <div
          class="flex flex-grow items-center gap-4 max-tablet:flex-col-reverse max-tablet:items-start max-tablet:gap-2"
        >
          <div
            class="basis-3/5 text-lg leading-[26px] line-clamp-2 max-tablet:text-base max-tablet:leading-[18px]"
          >
            {{ product.title }}
          </div>
          <div
            class="flex items-center justify-between bg-gray-11 rounded-lg h-8 w-[94px] 1024:ml-8 border"
          >
            <button
              class="w-8 flex items-center justify-center"
              @click="handleDecrementProduct(product.id)"
            >
              <img src="@/assets/img/minus.svg" class="w-4 h-4" />
            </button>
            <div class="w-8 font-bold flex items-center justify-center">
              {{ product.count }}
            </div>
            <button
              class="w-8 flex items-center justify-center"
              @click="hanleIncrementProduct(product.id)"
            >
              <img src="@/assets/img/plus.svg" class="w-4 h-4" />
            </button>
          </div>
          <div
            class="flex min-w-[160px] flex-col items-end max-md:items-start max-tablet:gap-1"
          >
            <span class="badge badge-pill badge-success text-lgs">
              {{ product.sale_price | numberFilter }} sum</span
            >
          </div>
          <div class="flex w-full items-center justify-end gap-6 max-sm:gap-4">
            <button
              class="flex items-center justify-center"
              @click="handleToggleFavorite(product)"
            >
              <img
                v-if="isHaveFavorite(product.id)"
                src="@/assets/img/favorite_active.svg"
                class="h-6 w-6"
              />
              <img v-else src="@/assets/img/favorite.svg" class="h-6 w-6" />
            </button>
            <button
              class="flex cursor-pointer items-center gap-3 text-secondary hover:text-primary-red"
              @click="handleRemoveProduct(product.id)"
            >
              <img src="@/assets/img/trash.svg" class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    products: {
      type: Array,
      default: () => {},
    },
    isAllSelected: {
      type: Boolean,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      isHaveFavorite: 'favorities/isHaveFavorite',
    }),
  },

  methods: {
    handleRemoveProduct(id) {
      this.$store.commit('cart/REMOVE_PRODUCT', id)
    },
    hanleIncrementProduct(id) {
      this.$store.commit('cart/INCREMENT_PRODUCT_COUNT', id)
    },
    handleDecrementProduct(id) {
      this.$store.commit('cart/DECREMENT_PRODUCT_COUNT', id)
    },
    handleToggleProductSelection(id) {
      this.$store.commit('cart/TOGGLE_PRODUCT_SELECTION', id)
    },
    handleToggleAllProductSelection() {
      this.$store.commit('cart/TOGGLE_ALL_PRODUCTS_SELECTION')
    },

    handleToggleFavorite(product) {
      this.$store.commit('favorities/TOGGLE_FAVORITE', product)
    },
  },
}
</script>

<template>
  <div class="768:basis-2/3">
    <div
      class="border-b border-secondary-light py-3 flex justify-between align-items-center"
    >
      <div class="flex items-start gap-8">
        <!-- <div @click="handleToggleAllProductSelection">
          <input
            type="checkbox"
            :checked="isAllSelected"
            class="checkbox checkbox-secondary checkbox-lg w-5 h-5"
          />
        </div> -->
        <!-- <span class="text-lg">Select All</span> -->
      </div>
      <div class="cursor-pointer hover:text-red-500" @click="hanldeSetEmpty">
        Remove all
      </div>
    </div>
    <div
      v-for="(product, index) in products"
      :key="index"
      class="border-b border-secondary-light py-4 max-tablet:py-2"
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
              class="flex items-center gap-3 text-secondary hover:text-primary-red cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 max-tablet:h-6 max-tablet:w-6 fill-none"
              >
                <path
                  d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <button
              class="flex cursor-pointer items-center gap-3 text-secondary hover:text-primary-red"
              @click="handleRemoveProduct(product.id)"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 max-tablet:h-6 max-tablet:w-6"
              >
                <path
                  d="M16.8745 4.37524L3.12451 4.37525"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M8.125 8.12524V13.1252"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M11.875 8.12524V13.1252"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15.6245 4.37525V16.2502C15.6245 16.416 15.5587 16.575 15.4415 16.6922C15.3242 16.8094 15.1653 16.8752 14.9995 16.8752H4.99951C4.83375 16.8752 4.67478 16.8094 4.55757 16.6922C4.44036 16.575 4.37451 16.416 4.37451 16.2502V4.37524"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M13.125 4.37524V3.12524C13.125 2.79372 12.9933 2.47578 12.7589 2.24136C12.5245 2.00694 12.2065 1.87524 11.875 1.87524H8.125C7.79348 1.87524 7.47554 2.00694 7.24112 2.24136C7.0067 2.47578 6.875 2.79372 6.875 3.12524V4.37524"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    hanldeSetEmpty() {
      this.$store.commit('cart/SET_EMPTY_CART')
    },
  },
}
</script>

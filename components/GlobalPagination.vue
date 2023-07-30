<template>
  <div
    v-if="getTotalCountOfPages > 1"
    class="flex items-center justify-center bg-white px-4 py-3 sm:px-6"
  >
    <nav
      class="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <span
        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click="handleDecrementPage"
      >
        <span class="sr-only">Previous</span>
        <img class="w-4 h-4" src="@/assets/img/arrow-left.svg" />
      </span>

      <span
        v-for="p in getTotalCountOfPages"
        :key="p"
        class="relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        :class="{
          'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
            page === p,
        }"
        @click="$emit('onPaginate', p)"
      >
        {{ p }}
      </span>
      <!-- z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600-->
      <span
        class="disabled relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click="handleIncrementPage"
      >
        <span class="sr-only">Next</span>
        <img class="w-4 h-4" src="@/assets/img/arrow-right.svg" />
      </span>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
  },

  computed: {
    getTotalCountOfPages() {
      return Math.ceil(this.totalCount / this.pageSize)
    },
  },
  methods: {
    handleIncrementPage() {
      if (this.page < this.getTotalCountOfPages) {
        this.$emit('onPaginate', this.page + 1)
      }
    },
    handleDecrementPage() {
      if (this.page > 1) {
        this.$emit('onPaginate', this.page - 1)
      }
    },
  },
}
</script>

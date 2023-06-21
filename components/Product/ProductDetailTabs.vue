<template>
  <div>
    <div
      class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
    >
      <ul class="flex flex-wrap justify-center -mb-px">
        <li class="mr-2">
          <a
            class="inline-block p-4 border-b-2 rounded-t-lg"
            :class="{
              'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500':
                activeTab === 1,
            }"
            @click="handleSelectTab(1)"
            >Description</a
          >
        </li>
        <li class="mr-2">
          <a
            class="inline-block p-4 border-b-2 rounded-t-lg"
            :class="{
              'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500':
                activeTab === 2,
            }"
            @click="handleSelectTab(2)"
            >Instruction</a
          >
        </li>
        <!-- <li class="mr-2">
          <a
            class="inline-block p-4 border-b-2 rounded-t-lg"
            :class="{
              'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500':
                activeTab === 3,
            }"
            @click="handleSelectTab(3)"
            >Comments</a
          >
        </li> -->
      </ul>
    </div>
    <div class="mt-5">
      <div v-if="activeTab === 1" v-html="product.description"></div>
      <div v-else-if="activeTab === 2" v-html="product.instruction"></div>
      <!-- <div v-else-if="activeTab === 3">Comments
        
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      activeTab: 1,
    }
  },

  methods: {
    handleSelectTab(tab) {
      this.activeTab = tab
    },
  },
}
</script>

<template>
  <div class="pb-4 max-laptopM:hidden max-laptop:pb-2">
    <div class="mx-auto max-w-screen-xl">
      <nav aria-label="Tabs" class="flex border-gray-100 text-sm font-medium">
        <a
          v-for="(topItem, index) in categories"
          :key="index"
          class="-mb-px border-b p-2 hover:text-cyan-500 cursor-pointer"
          :class="
            activeCategoryId == topItem.id
              ? 'border-current'
              : 'border-transparent'
          "
          @click="handleSelectTopCategory(topItem.id)"
        >
          {{ topItem.title }}
        </a>
        <!-- <a
          href=""
          class="-mb-px border-b  p-2 hover:text-cyan-500"
        >
          Silver
        </a> -->
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeCategoryId: null,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'references/GET_TOP_CATEGOREIS',
    }),
  },
  methods: {
    handleSelectTopCategory(id) {
      this.activeCategoryId = id
    },
  },
}
</script>

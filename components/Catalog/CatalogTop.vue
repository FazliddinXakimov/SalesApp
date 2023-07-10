<template>
  <div class="pb-4 max-laptopM:hidden max-laptop:pb-2 pt-2">
    <div class="mx-auto max-w-screen-xl">
      <nav
        aria-label="Tabs"
        class="flex justify-between items-center border-gray-100 text-sm font-medium"
      >
        <span v-for="(topItem, index) in categories" :key="index">
          <nuxt-link
            :to="
              localePath({
                name: `catalog-id`,
                params: { id: topItem.slug },
                query: { catalog: topItem.id },
              })
            "
            class="-mb-px border-b p-2 hover:text-cyan-500 cursor-pointer"
            :class="
              activeCategoryId == topItem.id
                ? 'border-current'
                : 'border-transparent'
            "
          >
            {{ topItem.title }}
          </nuxt-link>
        </span>
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
    handleSelectTopCategory(category) {
      this.activeCategoryId = category.id
    },
  },
}
</script>

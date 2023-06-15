<template>
  <div
    class="grid grid-cols-6 gap-5 max-lg:min-w-max max-lg:grid-flow-col max-lg:grid-cols-2-"
  >
    <a v-for="(brand, index) in brands.results" :key="index" href="#">
      <div
        class="flex h-20 items-center justify-center rounded-lg bg-neutral-200 max-lg:min-w-[160px]"
      >
        {{ brand.title }}
      </div>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      brands: 'home/GET_BRANDS',
    }),
  },
}
</script>

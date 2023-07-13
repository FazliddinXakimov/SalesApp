<template>
  <div class="grid 1024:grid-cols-6 grid-cols-3 gap-5">
    <a v-for="(brand, index) in brands.results" :key="index" href="#">
      <div
        class="flex h-20 items-center justify-center rounded-lg bg-neutral-200 max-lg:min-w-[120px]"
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

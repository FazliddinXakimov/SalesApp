<template>
  <nav class="bg-slate-700 py-1 w-full top-0 z-20">
    <div
      class="flex items-center justify-between mx-auto max-w-screen-xl text-white"
    >
      <div class="768:hidden block">SalesAPP</div>
      <div class="768:hidden flex items-center">
        <button class="mr-2">
          <a href="tel:+998997293417">
            <img src="@/assets/img/header-phone.svg" class="h-5 w-5" />
          </a>
        </button>
        <button class="dropdown__action flex items-center">
          <div class="flex justify-between items-center text-white">
            <img src="@/assets/img/header-location.svg" class="h-5 w-5" />
            {{ selectedRegion?.name }}
          </div>
          <div class="dropdown__list block z-40">
            <button
              v-for="(region, index) in regions_list"
              :key="index"
              class="dropdown__item"
              @click="handleSelectRegion(region.id)"
            >
              {{ region.name }}
            </button>
          </div>
        </button>
      </div>
      <div class="768:flex items-center hidden">
        <button class="mr-2 dropdown__action hidden 768:inline-block">
          <div class="flex justify-between items-center text-white">
            <img
              src="@/assets/img/header-location.svg"
              class="h-5 w-5 inline-block"
            />

            {{ selectedRegion?.name }}
          </div>

          <div class="dropdown__list block z-40">
            <button
              v-for="(region, index) in dropdownRegions"
              :key="index"
              class="dropdown__item"
              @click="handleSelectRegion(region.id)"
            >
              {{ region.name }}
            </button>
          </div>
        </button>
      </div>
      <div class="768:flex items-center hidden">
        <button class="mr-2">
          <img src="@/assets/img/header-phone.svg" class="h-5 w-5" />
        </button>
        <a class="" href="tel:+998997293417">+998 99 729 34 17</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  computed: {
    ...mapGetters({
      selectedRegion: 'header/GET_SELECTED_REGION',
      regions_list: 'header/GET_REGIONS_LIST',
      dropdownRegions: 'header/GET_DROPDOWN_REGIONS',
    }),
  },

  methods: {
    handleSelectRegion(value) {
      this.$store.commit('header/SELECT_REGION', value)
    },
  },
}
</script>

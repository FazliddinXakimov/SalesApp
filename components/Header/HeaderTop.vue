<template>
  <nav class="bg-slate-700 py-1 fixed w-full sticky top-0 z-20">
    <div
      class="flex items-center justify-between mx-auto max-w-screen-xl px-4 text-white"
    >
      <div class="768:hidden block">Brand</div>
      <div class="768:flex items-center hidden">
        <button class="mr-2 dropdown__action hidden 768:inline-block">
          <div class="flex justify-between items-center text-white">
            <img
              src="@/assets/img/header-location.svg"
              class="h-5 w-5 inline-block"
            />
            {{ selectedRegion?.name[$i18n.locale] }}
          </div>

          <div class="dropdown__list block z-40">
            <button
              v-for="(region, index) in getDropdownRegions"
              :key="index"
              class="dropdown__item"
              @click="handleSelectRegion(region.id)"
            >
              {{ region.name[$i18n.locale] }}
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
      <div class="768:hidden flex items-center">
        <button class="mr-2">
          <a href="tel:+998997293417">
            <img src="@/assets/img/header-phone.svg" class="h-5 w-5" />
          </a>
        </button>
        <button class="dropdown__action flex items-center">
          <div class="flex justify-between items-center text-white">
            <img src="@/assets/img/header-location.svg" class="h-5 w-5" />
            {{ selectedRegion?.name[$i18n.locale] }}
          </div>
          <div class="dropdown__list block z-40">
            <button
              v-for="(region, index) in regions_list"
              :key="index"
              class="dropdown__item"
              @click="handleSelectRegion(region.id)"
            >
              {{ region.name[$i18n.locale] }}
            </button>
          </div>
        </button>
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
    }),

    getDropdownRegions() {
      return this.regions_list.filter((r) => r.id !== this.selectedRegion.id)
    },
  },

  methods: {
    handleSelectRegion(value) {
      this.$store.commit('header/SELECT_REGION', value)
    },
  },
}
</script>

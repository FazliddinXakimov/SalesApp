<template>
  <nav class="bg-slate-700 w-full top-0 z-20 main-footer">
    <div
      class="flex items-center justify-between mx-auto max-w-screen-xl text-white px-2 py-3 960:py-1"
    >
      <div
        class="768:hidden block cursor-pointer"
        @click="$router.push(localePath('/'))"
      >
        SalesAPP
      </div>

      <div class="768:hidden flex items-center">
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
        <button class="ml-2 dropdown__action 768:inline-block">
          <div
            class="flex justify-between items-center text-white"
            @click="handleChangeLang(getNotCurrentLang.key)"
          >
            <img :src="getCurrentLangIcon" class="h-5 w-5 inline-block mr-1" />

            {{ getCurrentLang?.title }}
          </div>

          <!-- <div class="dropdown__list block z-40">
            <button
              v-for="(lang, index) in getLangOptions"
              :key="index"
              class="dropdown__item"
              @click="handleChangeLang(lang.key)"
            >
              {{ lang.title }}
            </button>
          </div> -->
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
        <div>
          <button class="mr-2">
            <img src="@/assets/img/header-phone.svg" class="h-5 w-5" />
          </button>
          <a class="" href="tel:+998997293417">+998 99 729 34 17</a>
        </div>
        <button class="ml-2 dropdown__action 768:inline-block">
          <div
            class="flex justify-between items-center text-white"
            @click="handleChangeLang(getNotCurrentLang.key)"
          >
            <img :src="getCurrentLangIcon" class="h-5 w-5 inline-block mr-1" />

            {{ getCurrentLang?.title }}
          </div>

          <!-- <div class="dropdown__list block z-40">
            <button
              v-for="(lang, index) in getLangOptions"
              :key="index"
              class="dropdown__item"
              @click="handleChangeLang(lang.key)"
            >
              {{ lang.title }}
            </button>
          </div> -->
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
      dropdownRegions: 'header/GET_DROPDOWN_REGIONS',
      lang: 'header/GET_LANG',
      langOptions: 'header/GET_LANG_OPTIONS',
    }),

    getCurrentLang() {
      return this.langOptions.find((l) => l.key === this.lang)
    },
    getNotCurrentLang() {
      return this.langOptions.find((l) => l.key !== this.lang)
    },

    getCurrentLangIcon() {
      const lang =
        this.getCurrentLang.key === 'uz'
          ? require('@/assets/img/uzbek.svg')
          : require('@/assets/img/russian.svg')

      return lang
    },

    getLangOptions() {
      return this.langOptions.filter((l) => l.key !== this.lang)
    },
  },

  methods: {
    handleSelectRegion(value) {
      this.$store.commit('header/SELECT_REGION', value)
    },

    async handleChangeLang(lang) {
      await this.$i18n.setLocale(lang)
      this.$store.commit('header/SET_LANG', lang)
    },
  },
}
</script>

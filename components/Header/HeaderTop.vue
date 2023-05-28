<template>
  <nav class="bg-slate-700 py-1 fixed w-full">
    <div
      class="flex items-center justify-between mx-auto max-w-screen-xl px-4 text-white"
    >
      <div class="768:hidden block">Brand</div>
      <div class="768:flex items-center hidden">
        <button class="mr-2 hidden 768:inline-block">
          <img src="@/assets/img/header-location.svg" class="h-5 w-5" /></button
        >{{ getRegion }}
      </div>
      <div class="768:flex items-center hidden">
        <button class="mr-2">
          <img src="@/assets/img/header-phone.svg" class="h-5 w-5" />
        </button>
        +998 99 729 34 17
      </div>
      <div class="768:hidden flex items-center">
        <button class="mr-2">
          <img src="@/assets/img/header-phone.svg" class="h-5 w-5" />
        </button>
        <button class="flex items-center">
          <img src="@/assets/img/header-location.svg" class="h-5 w-5" />
          {{ getRegion }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  components: {},
  computed: {
    getRegion() {
      return 'Toshkent'
    },
  },
}
</script>

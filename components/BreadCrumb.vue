<template>
  <div class="my-3">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <nuxt-link
            to="/"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <img src="@/assets/img/home.svg" class="w-4 h-4 mr-1" />
            {{ $t('homePage') }}
          </nuxt-link>
        </li>
        <li v-for="(item, index) in breadCrumb" :key="index">
          <div class="flex items-center">
            <img src="@/assets/img/right-arrow.svg" class="w-4 h-4 mr-1" />
            <nuxt-link
              v-if="item.link"
              :to="item.link"
              class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 disabled"
            >
              {{ item.title }}
            </nuxt-link>
            <div
              class="ml-1 text-sm font-medium text-gray-700 md:ml-2 disabled"
            >
              {{ item.title }}
            </div>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    breadCrumb: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

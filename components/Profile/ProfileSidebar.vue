<template>
  <div>
    <ul
      class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-5"
    >
      <li class="mr-2">
        <span
          href="#"
          aria-current="page"
          class="inline-block p-4 rounded-t-lg"
          :class="getTabComponent(1)"
          @click="$emit('changeActiveTab', 1)"
        >
          <span class="640:block hidden"> {{ $t('personalInformation') }}</span>
          <span class="640:hidden block">
            <img src="@/assets/img/user.svg" class="w-6 h-6" />
          </span>
        </span>
      </li>
      <li class="mr-2">
        <span
          href="#"
          class="inline-block p-4 rounded-t-lg"
          :class="getTabComponent(2)"
          @click="$emit('changeActiveTab', 2)"
        >
          <span class="640:block hidden">{{ $t('changePassword') }}</span>
          <span class="640:hidden block">
            <img src="@/assets/img/register-password.svg" class="w-6 h-6" />
          </span>
        </span>
      </li>
      <li class="mr-2">
        <span
          href="#"
          class="inline-block p-4 rounded-t-lg"
          :class="getTabComponent(3)"
          @click="$emit('changeActiveTab', 3)"
        >
          <span class="640:block hidden">{{ $t('myOrders') }}</span>
          <span class="640:hidden block">
            <img src="@/assets/img/profile/orders-box.svg" class="w-6 h-6" />
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    activeTab: {
      type: Number,
      default: 1,
    },
  },
  computed: {},

  methods: {
    getTabComponent(comp) {
      return this.activeTab === comp
        ? 'active text-blue-600 bg-gray-100'
        : 'hover:text-gray-600 hover:bg-gray-50'
    },
  },
}
</script>

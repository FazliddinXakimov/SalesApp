<template>
  <div>
    <div class="border rounded-md overflow-hidden">
      <button
        type="button"
        class="block w-full cursor-pointer border p-2 text-left"
        :class="getTabClass(1)"
        @click="$emit('changeActiveTab', 1)"
      >
        Personal Information
      </button>
      <button
        type="button"
        class="block w-full cursor-pointer border p-2 text-left"
        :class="getTabClass(2)"
        @click="$emit('changeActiveTab', 2)"
      >
        Change Password
      </button>
      <button
        type="button"
        class="block w-full cursor-pointer border p-2 text-left"
        :class="getTabClass(3)"
        @click="$emit('changeActiveTab', 3)"
      >
        My Orders
      </button>
    </div>
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
    getTabClass(tab) {
      return this.activeTab === tab
        ? 'bg-blue-500 text-white'
        : 'hover:bg-neutral-100 hover:text-neutral-500'
    },
  },
}
</script>

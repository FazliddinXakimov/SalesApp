<template>
  <div class="flex justify-between">
    <div class="768:basis-1/4">
      <ProfileSideBar
        :active-tab="activeTab"
        @changeActiveTab="changeActiveTab"
      />
    </div>

    <div class="768:basis-3/4 pl-4">
      <PersonalInformation v-if="activeTab === 1" />
      <UpdatePassword v-else-if="activeTab === 2" />
      <MyOrders v-else-if="activeTab === 3" />
    </div>
  </div>
</template>

<script>
import ProfileSideBar from '@/components/Profile/ProfileSidebar.vue'

export default {
  components: {
    ProfileSideBar,
    MyOrders: () => import('@/components/Profile/MyOrders.vue'),
    UpdatePassword: () => import('@/components/Profile/UpdatePassword.vue'),
    PersonalInformation: () =>
      import('@/components/Profile/PersonalInformation.vue'),
  },

  data() {
    return {
      activeTab: 1,
    }
  },

  mounted() {
    this.$store.dispatch('profile/FETCH_MY_ORDERS')
  },

  methods: {
    changeActiveTab(tab) {
      this.activeTab = tab
    },
  },
}
</script>

<!-- 66 543 14 24 -->

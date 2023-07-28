<template>
  <div>
    <BreadCrumb :bread-crumb="breadCrumb" class="mb-10" />
    <div>
      <div>
        <ProfileSideBar
          :active-tab="activeTab"
          @changeActiveTab="changeActiveTab"
        />
      </div>

      <div>
        <PersonalInformation v-if="activeTab === 1" />
        <UpdatePassword v-else-if="activeTab === 2" />
        <MyOrders v-else-if="activeTab === 3" :orders="myOrders" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      breadCrumb: [
        {
          title: 'Profile',
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      myOrders: 'profile/GET_MY_ORDERS',
    }),
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

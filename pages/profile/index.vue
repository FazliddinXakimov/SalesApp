<template>
  <div class="flex justify-between">
    <div class="768:basis-1/4">
      <ProfileSideBar />
    </div>

    <div class="768:basis-3/4 pl-4">
      <!-- <UpdatePassword /> -->
      <PersonalInformation />
    </div>
  </div>
</template>

<script>
import ProfileSideBar from '@/components/Profile/ProfileSidebar.vue'

export default {
  components: {
    ProfileSideBar,
    // UpdatePassword: ()=>import('@/components/Profile/UpdatePassword.vue'),
    PersonalInformation: () =>
      import('@/components/Profile/PersonalInformation.vue'),
  },
}
</script>

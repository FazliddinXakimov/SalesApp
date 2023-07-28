<template>
  <div>
    <h1 class="text-lg font-bold my-10">{{ aboutPageDetail.title }}</h1>
    <div v-html="aboutPageDetail.content"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      aboutPageDetail: 'references/GET_ABOUT_PAGE_DETAIL',
    }),
  },

  mounted() {
    this.$store.dispatch(
      'references/FETCH_ABOUT_PAGE_DETAIL',
      this.$route.params.id
    )
  },
}
</script>

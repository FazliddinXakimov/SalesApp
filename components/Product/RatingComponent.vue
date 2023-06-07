<template>
  <div>
    <!-- :value="value"
      :max-rating="maxRating"
      :glow="10"
      :rounded-corners="true" -->
    <no-ssr>
      <!-- <star-rating></star-rating> -->
    </no-ssr>
  </div>
</template>

<script>
// import StarRating from 'vue-star-rating'

export default {
  components: {
    // StarRating,
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },
    maxRating: {
      type: Number,
      default: 5,
    },
  },
}
</script>

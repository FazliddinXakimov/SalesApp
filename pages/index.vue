<template>
  <div>
    <!-- <HomeSliders :sliders="sliders" /> -->
  </div>
</template>

<script>
// import HomeSliders from '../components/Home/HomeSliders.vue'

export default {
  name: 'IndexPage',
  // components: { HomeSliders },
  data() {
    return {
      sliders: [
        {
          id: 1,
          img: '@/assets/img/cars.jpg',
          title: 'cars',
        },
        {
          id: 2,
          img: '@/assets/img/default.jpg',
          title: 'default',
        },
      ],
    }
  },
}
</script>

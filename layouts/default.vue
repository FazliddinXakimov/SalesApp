<template>
    <div>
        <HeaderMain />
        <Nuxt />
        <MobileBottomNavbar />
    </div>
</template>

<script>
import MobileBottomNavbar from '@/components/Header/MobileBottomNavbar.vue';

export default {
    components: {
        HeaderMain: () => import("@/components/Header/HeaderMain.vue"),
        MobileBottomNavbar
    }
}
</script>
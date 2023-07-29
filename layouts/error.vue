<template>
  <div class="flex justify-center flex-col items-center mt-32">
    <img src="@/assets/img/empty-catalog.svg" class="h-36 w-36" />
    <div class="font-medium text-lg">
      Not Found 404
    </div>
    <button
      class="bg-transparent text-green-500 border border-green-500 hover:bg-green-500 hover:text-white py-2 px-4 rounded mt-5"
      @click="$router.push(localePath('/'))"
    >
      Go To Home
    </button>
  </div>
</template>

<script>
export default {}
</script>

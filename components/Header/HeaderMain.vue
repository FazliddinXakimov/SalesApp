<template>
  <nav class="bg-gray-300 fixed w-full  top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-3">
      <a href="https://flowbite.com/" class="flex items-center">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Brand</span>
      </a>


      <div class="flex justify-start align-items-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-2">
          Katalog
        </button>
        <div class=" rounded-lg">
          <div class="w-full ">

            <div class="relative">
              <fa :icon="['fas', 'magnifying-glass']" class="absolute fa fa-search text-gray-400 top-4 left-4" />
              <input type="text" class="bg-white h-12 w-full px-24 rounded-lg focus:outline-none hover:cursor-pointer"
                name="">
              <span class="absolute top-3 right-5 border-l pl-4">
                <fa :icon="['fas', 'microphone']"
                  class="fa fa-microphone text-gray-500 hover:text-green-500 hover:cursor-pointer" />
              </span>
            </div>
          </div>
        </div>

      </div>
      <div class="flex item-center justify-between">
        <button class="mr-10">
          <fa :icon="['far', 'heart']" size="xl" />
        </button>

        <button class="mr-10">
          <fa :icon="['far', 'user']" size="xl" />
        </button>
        <button>
          <img src="~/assets/img/cart.svg" />
        </button>
      </div>
    </div>
  </nav>
</template>
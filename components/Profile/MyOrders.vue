<template>
  <!-- component -->

  <table class="min-w-max w-full table-auto">
    <thead>
      <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th class="py-3 px-6 text-left">Project</th>

        <th class="py-3 px-6 text-center">Users</th>
        <th class="py-3 px-6 text-center">Status</th>
      </tr>
    </thead>
    <tbody class="text-gray-600 text-sm font-light">
      <tr class="border-b border-gray-200 hover:bg-gray-100">
        <td class="py-3 px-6 text-left whitespace-nowrap">
          <div class="flex items-center">
            <span class="font-medium">React Project</span>
          </div>
        </td>
        <td class="py-3 px-6 text-left">
          <div class="flex items-center">
            <span>Eshal Rosas</span>
          </div>
        </td>

        <td class="py-3 px-6 text-center">
          <span
            class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs"
            >Active</span
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  components: {},
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div class="text-2xl">SmartPhones</div>
    </div>
    <div class="flex justify-end items-center">
      <div class="form-select">
        <select v-model="filter.type">
          <option :value="$t('Gratitude')">
            {{ $t('Gratitude') }}
          </option>
          <option :value="$t('Claim')">
            {{ $t('Claim') }}
          </option>
          <option :value="$t('Question')">
            {{ $t('Question') }}
          </option>
        </select>
        <span class="label">{{ $t('Topic') }}</span>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="basis-1/4">
        <CatalogFilter />
      </div>
      <div class="basis-3/4">Products</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        type: '',
      },
    }
  },
  name: 'CatalogDetails',

  mounted() {
    console.log('this.rotue', this.$route)
  },
}
</script>

<style lang="scss" scoped>
.form-select {
  width: 100%;
  margin-bottom: 28px;
  position: relative;
  select {
    width: 100%;
    height: 44px;
    border-radius: 6px;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    padding: 0 17px;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.1641 4.78625L7.50598 9.44434L2.83073 4.76908' stroke='%23333333' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: 99% center;
    box-shadow: 0 0 0 1px #d5d8df;
  }
  .label {
    color: #767676;
    position: absolute;
    left: 13px;
    padding: 0px 4px 0px 4px;
    background: #fff;
    top: -8px;
    font-size: 12px;
  }
}
</style>

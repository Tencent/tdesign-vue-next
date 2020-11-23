<template>
  <div>
    <div style="margin: 12px 0">
      <label>是否显示周末：</label>
      <t-select v-model="isShowWeekendDefault" class="demo-select-base">
        <t-option v-for="item in options" :key="item.value"
                  :value="item.value" :label="item.label" />
      </t-select>
    </div>
    <t-calendar :isShowWeekendDefault="isShowWeekendDefault"></t-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowWeekendDefault: false,
      options: [
        { value: true, label: '显示周末' },
        { value: false, label: '不显示周末' },
      ],
    };
  },
};
</script>

<style scoped>
.demo-select-base {
  width: 200px;
  display: inline-block;
  margin: 0 10px 0 0;
}
</style>

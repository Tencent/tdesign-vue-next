<template>
  <div>
    <div style="margin: 12px 0">
      <label>日历的第一列为：</label>

      <t-select v-model="firstDayOfWeek" class="demo-select-base">
        <t-option v-for="item in options" :key="item.value"
                  :value="item.value" :label="item.label" />
      </t-select>
    </div>
    <t-calendar :firstDayOfWeek="firstDayOfWeek"></t-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstDayOfWeek: 3,
      options: [
        { value: 1, label: '周一' },
        { value: 2, label: '周二' },
        { value: 3, label: '周三' },
        { value: 4, label: '周四' },
        { value: 5, label: '周五' },
        { value: 6, label: '周六' },
        { value: 7, label: '周日' },
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

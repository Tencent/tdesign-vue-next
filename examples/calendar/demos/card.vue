<template>
  <div>
    <div style="margin: 12px 0">
      <label>请选择风格：</label>
      <t-select v-model="theme" class="demo-select-base">
        <t-option v-for="item in options" :key="item.value"
                  :value="item.value" :label="item.label" />
      </t-select>

      <label>是否显示周末：</label>
      <t-switch v-model="isShowWeekendDefault">
      </t-switch>

      <t-button theme="primary" @click="toCurrent()" style="margin-left:12px">回到今天</t-button>
    </div>
    <t-calendar ref="myCalendar"
                :theme="theme"
                :isShowWeekendDefault="isShowWeekendDefault"></t-calendar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: 'card',
      isShowWeekendDefault: true,
      options: [
        { value: 'full', label: '全屏风格' },
        { value: 'card', label: '卡片风格' },
      ],
    };
  },
  methods: {
    toCurrent() {
      if (this.$refs.myCalendar) {
        this.$refs.myCalendar.toCurrent();
      }
    },
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

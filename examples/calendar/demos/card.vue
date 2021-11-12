<template>
  <div>
    <div style="margin: 12px 0">
      <label>请选择风格：</label>
      <t-select v-model="theme" class="demo-select-base">
        <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
      </t-select>
      <t-button theme="primary" @click="toCurrent()">今天（当前高亮日期）</t-button>
    </div>
    <t-calendar ref="myCalendar" :theme="theme" :isShowWeekendDefault="true"></t-calendar>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options = [
  { value: 'full', label: '全屏风格' },
  { value: 'card', label: '卡片风格' },
]
export default defineComponent({
  setup() {
    const theme = ref('card')
    const myCalendar = ref('')

    const toCurrent = () => {
      if (myCalendar) {
        myCalendar.value.toCurrent();
      }
    }

    return {
      theme,
      options,
      myCalendar,
      toCurrent
    }
  },
});
</script>

<style scoped>
.demo-select-base {
  width: 200px;
  display: inline-block;
  margin: 0 10px 0 0;
}
</style>

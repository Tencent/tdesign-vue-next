<template>
  <div>
    <t-select v-model="value" placeholder="-请选择-" style="width: 200px">
      <t-option-group label="热门城市">
        <t-option v-for="(item, index) in options1" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-option-group>
      <t-option-group label="广东省">
        <t-option v-for="(item, index) in options2" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-option-group>
      <t-option-group label="江苏省">
        <t-option v-for="(item, index) in options3" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-option-group>
    </t-select>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const options1 = [
  {
    label: '北京',
    value: 'beijing',
  },
  {
    label: '上海',
    value: 'shanghai',
  },
];

const options2 = [
  {
    label: '广州',
    value: 'guangzhou',
  },
  {
    label: '深圳',
    value: 'shenzhen',
  },
  {
    label: '东莞',
    value: 'dongguang',
  },
];

const options3 = [
  {
    label: '南京',
    value: 'nanjing',
  },
  {
    label: '苏州',
    value: '苏州',
  },
  {
    label: '无锡',
    value: 'wuxi',
  },
];

export default defineComponent({
  setup() {
    const value = ref('');
    return {
      value,
      options1,
      options2,
      options3,
    };
  },
});
</script>

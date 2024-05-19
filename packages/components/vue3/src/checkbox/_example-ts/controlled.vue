<template>
  <t-space direction="vertical" size="large">
    <t-space>
      <!-- 单个 Checkbox 受控模式 -->
      <t-checkbox v-model="checked1" @change="onChange1">语法糖（v-model）</t-checkbox>
      <t-checkbox :checked="true" @change="onChange2">受控属性</t-checkbox>
      <t-checkbox :default-checked="false" :on-change="onChange2">非受控属性</t-checkbox>
    </t-space>

    <!-- 复选框框组受控模式 -->
    <t-checkbox-group :value="checked2" :options="options" :on-change="onChange2" />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CheckboxGroupProps, CheckboxProps } from 'tdesign-vue-next';
const options: CheckboxGroupProps['options'] = [
  {
    label: '全选',
    checkAll: true,
  },
  {
    value: 1,
    label: '受控模式选项一',
  },
  {
    value: 2,
    label: '受控模式选项二',
  },
  {
    value: 3,
    label: '受控模式选项三',
  },
];
const checked1 = ref(true);
const checked2 = ref<CheckboxGroupProps['value']>([1]);
const onChange1: CheckboxProps['onChange'] = (val) => {
  console.log('change:', checked1.value, val);
};
const onChange2: CheckboxGroupProps['onChange'] = (value, context) => {
  console.log('change: ', value, context);
};
</script>

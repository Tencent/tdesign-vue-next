<template>
  <t-space direction="vertical">
    <p>方式一：业务侧自定义全选功能。选中值: {{ value1.join(',') }}</p>
    <t-checkbox :checked="checkAll" :indeterminate="indeterminate" :on-change="handleSelectAll">全选</t-checkbox>
    <t-checkbox-group v-model="value1" :options="options1" @change="onChange1" />

    <br />
    <p>方式二：组件内置全选功能，使用插槽定义选项。选中值: {{ value2.join(', ') }}</p>
    <!-- 列表渲染，key 是避免重复渲染的重要参数 -->
    <t-checkbox-group v-model="value2" @change="onChange2">
      <t-checkbox key="all" :check-all="true" label="全选" />
      <t-checkbox key="a" value="选项一">选项一</t-checkbox>
      <t-checkbox key="b" label="选项二" value="选项二" />
      <t-checkbox key="c" label="选项三" value="选项三" :disabled="true" />
    </t-checkbox-group>

    <br />
    <p>方式三：组件内置全选功能，使用 `options` 定义选项。选中值: {{ value3.join(', ') }}</p>
    <t-checkbox-group v-model="value3" :options="options2" lazy-load @change="onChange3" />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref, computed } from 'vue';
import { CheckboxGroupProps, CheckboxProps } from 'tdesign-vue-next';
const options1: CheckboxGroupProps['options'] = [
  {
    value: '选项一',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    label: (h) => <div>选项一</div>,
  },
  {
    value: '选项二',
    label: '选项二',
  },
  {
    value: '选项三',
    label: '选项三',
  },
];
const options2: CheckboxGroupProps['options'] = [
  {
    label: '全选',
    checkAll: true,
  },
  // html attribute: title, hover to see more label text info
  {
    value: '选项一',
    label: '选项一',
    title: '选项一',
  },
  {
    value: '选项二',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    label: (h) => <div>选项二</div>,
  },
  {
    value: '选项三',
    label: '选项三',
  },
];
const value1 = ref(['选项一']);
const value2 = ref(['选项一']);
const value3 = ref(['选项一', '选项二', '选项三']);
const checkAll = computed(() => options1.length === value1.value.length);
const indeterminate = computed(() => !!(options1.length > value1.value.length && value1.value.length));
const handleSelectAll: CheckboxProps['onChange'] = (checked) => {
  value1.value = checked ? ['选项一', '选项二', '选项三'] : [];
};
const onChange1: CheckboxGroupProps['onChange'] = (val) => {
  console.log(value1.value, val);
};
const onChange2: CheckboxGroupProps['onChange'] = (val) => {
  console.log(value2.value, val);
};
const onChange3: CheckboxGroupProps['onChange'] = (val) => {
  console.log(value3.value, val);
};
</script>

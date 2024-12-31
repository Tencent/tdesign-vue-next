<template>
  <t-space direction="vertical">
    <t-radio-group v-model="value" allow-uncheck name="city" :options="options" @change="onChange"></t-radio-group>

    <t-radio-group default-value="选项一" name="city" :options="itemOptions" @change="onChange"></t-radio-group>

    <t-radio-group default-value="1" @change="onChange">
      <t-radio value="1">选项一</t-radio>
      <t-radio value="2">选项二</t-radio>
      <t-radio value="3">选项三</t-radio>
      <t-radio value="4" disabled>选项四</t-radio>
    </t-radio-group>

    <h5>可取消选中单选框组</h5>
    <t-radio-group default-value="1" @change="onChange">
      <t-radio allow-uncheck value="1">可取消选中项一</t-radio>
      <t-radio allow-uncheck value="2">可取消选中项二</t-radio>
      <t-radio allow-uncheck value="3">可取消选中项三</t-radio>
      <t-radio value="4">不可取消选中项</t-radio>
    </t-radio-group>

    <t-radio-group default-value="2" allow-uncheck :options="options" theme="button" @change="onChange"></t-radio-group>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RadioGroupProps } from 'tdesign-vue-next';
const options: RadioGroupProps['options'] = [
  {
    value: '1',
    label: '选项一',
    disabled: true,
  },
  {
    value: '2',
    label: '选项二',
  },
  {
    value: '3',
    label: '选项三',
  },
  {
    value: '4',
    label: () => '选项四',
  },
];
const itemOptions: RadioGroupProps['options'] = ['选项一', '选项二', '选项三', '选项四'];
const value = ref('');
const onChange: RadioGroupProps['onChange'] = (checkedValues) => {
  console.log('checkedValues:', value.value, checkedValues);
};
</script>

<style scoped>
.t-radio-group {
  margin-bottom: 16px;
}
</style>

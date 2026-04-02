<template>
  <t-space>
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      :popup-props="popupProps"
      style="width: 200px; display: inline-block"
    />
    <t-select
      v-model="value"
      placeholder="-请选择-"
      :options="options"
      :popup-props="popupProps2"
      style="width: 200px; display: inline-block; margin-left: 20px"
    />
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { SelectProps } from 'tdesign-vue-next';
const options: SelectProps['options'] = [
  {
    label: '已选择的选项',
    value: '1',
  },
  {
    label: '短的选项二',
    value: '2',
  },
  {
    label: '很长很长很很长很长很长的选项三',
    value: '3',
  },
];
const value = ref('1');
const popupProps: SelectProps['popupProps'] = {
  overlayInnerStyle: {
    width: '200px',
  },
};
const popupProps2: SelectProps['popupProps'] = {
  overlayInnerStyle: (trigger) => ({
    width: `${trigger.offsetWidth}px`,
  }),
};
</script>

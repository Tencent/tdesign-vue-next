<template>
  <t-tree-select
    v-model="value"
    :data="options"
    clearable
    placeholder="请选择"
    :popup-visible="popupVisible"
    @popup-visible-change="onVisibleChange"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TreeSelectProps } from 'tdesign-vue-next';
const options: TreeSelectProps['data'] = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
      },
      {
        label: '深圳市',
        value: 'shenzhen',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    disabled: true,
    children: [
      {
        label: '南京市',
        value: 'nanjing',
      },
      {
        label: '苏州市',
        value: 'suzhou',
      },
    ],
  },
];
const value = ref('');
const popupVisible = ref(false);
const onVisibleChange: TreeSelectProps['onPopupVisibleChange'] = (visible, context) => {
  console.log(visible, context);
  if (context.trigger || context.node?.label !== '广州市') {
    popupVisible.value = visible;
  }
};
</script>

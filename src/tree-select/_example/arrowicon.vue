<template>
  <t-tree-select
    v-model="value"
    :data="options"
    clearable
    placeholder="请选择"
    :popup-visible="popupVisible"
    :suffix-icon="renderArrowIcon"
    @popup-visible-change="onVisibleChange"
  >
    <!-- 也可以通过插槽方式传递箭头图标，示例有效勿删 -->
    <!-- <template #suffixIcon>
      <Icon name="center-focus-strong" />
    </template> -->
  </t-tree-select>
</template>
<script setup lang="jsx">
import { Icon } from 'tdesign-icons-vue-next';
import { ref, computed } from 'vue';

const options = [
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

const onVisibleChange = (visible, context) => {
  console.log(visible, context);
  if (context.trigger || context.node?.label !== '广州市') {
    popupVisible.value = visible;
  }
};

// props传递suffixIcon，如需实现激活/未激活状态不同图标，可参考此用例onVisibleChange接收事件自行维护状态，传递不同图标。
const renderArrowIcon = computed(() =>
  popupVisible.value ? () => '我是选择器激活时内容' : () => <Icon name="center-focus-strong" />,
);
</script>

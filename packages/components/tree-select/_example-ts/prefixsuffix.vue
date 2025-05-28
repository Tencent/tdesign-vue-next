<template>
  <t-tree-select
    v-model="value"
    :data="options"
    clearable
    placeholder="请选择"
    :popup-visible="popupVisible"
    :prefix-icon="getPrefixIcon"
    :suffix="getSuffix"
    @popup-visible-change="onVisibleChange"
  >
    <!-- 也可以通过插槽方式传递，示例有效勿删 -->
    <!-- <template #prefixIcon>
      <Icon name="happy" />
    </template>
    <template #suffix>foobar suffix</template> -->
  </t-tree-select>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { PopupTriggerEvent, PopupTriggerSource, TreeNodeModel, TreeSelectProps } from 'tdesign-vue-next';
import { Icon } from 'tdesign-icons-vue-next';
interface TreeSelectPopupVisibleContext<T> {
  e?: PopupTriggerEvent | Event;
  node?: TreeNodeModel<T>;
  trigger?: PopupTriggerSource | 'clear';
}
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  children?: Option[];
}
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
const onVisibleChange = (visible: boolean, context: TreeSelectPopupVisibleContext<Option>) => {
  console.log(visible, context);
  if (context.trigger || context.node?.label !== '广州市') {
    popupVisible.value = visible;
  }
};

// props传递prefixIcon、suffix，请注意属性名拼写不同，区分箭头图标的suffixIcon
const getPrefixIcon: TreeSelectProps['prefixIcon'] = () => <Icon name="center-focus-strong" />;
const getSuffix: TreeSelectProps['suffix'] = () => (
  <div style="color: var(--td-text-color-secondary)">
    <span>后缀内容</span>
    <Icon name="happy" />
  </div>
);
</script>

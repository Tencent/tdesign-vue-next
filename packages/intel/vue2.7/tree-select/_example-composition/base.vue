<template>
  <t-space direction="vertical">
    <!-- 基础示例，单选场景，valueMode: 'onlyLeaf' 表示只允许选中叶子节点 -->
    <t-tree-select
      style="width: 500px"
      :data="options"
      v-model="value1"
      :treeProps="{ expandAll: true, valueMode: 'onlyLeaf' }"
      filterable
      clearable
      placeholder="请选择（仅显示叶子节点）"
      @blur="onBlurTrigger"
      @change="onChange"
    />

    <!-- 选中值为叶子节点，输入框显示全部层级 -->
    <t-tree-select
      ref="single-tree-select"
      style="width: 500px"
      :data="options"
      v-model="value2"
      label="单选："
      :treeProps="{ expandAll: true, valueMode: 'onlyLeaf' }"
      clearable
      placeholder="请选择（显示选中节点的全部路径）"
      @blur="onBlurTrigger"
      @change="onChange"
    >
      <template #valueDisplay="{ value }">
        <div v-if="value.label">{{ getNodePath(value) }}</div>
      </template>
    </t-tree-select>

    <!-- 自由控制下拉框显示与否，示例代码有效，勿删 -->
    <!-- <t-tree-select
      style="width: 500px"
      :data="options"
      v-model="value"
      :popupVisible="popupVisible"
      :treeProps="{ expandAll: true, valueMode: 'onlyLeaf' }"
      filterable
      clearable
      placeholder="请选择"
      @blur="onBlurTrigger"
      @change="onChange"
      @popup-visible-change="onVisibleChange"
    /> -->
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const singleTreeSelect = ref();
const value1 = ref('');
const value2 = ref('');
// const popupVisible = ref(false);
const options = ref([
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
        children: [
          {
            label: '南山区海天二路33号腾讯滨海大厦',
            value: 'Tencent',
          },
        ],
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
]);
const onBlurTrigger = (context) => {
  console.log('blur:', context);
};
const onChange = (value, context) => {
  console.log('change:', value, context, context.node?.getPath());
};
// const onVisibleChange = (v, c) => {
//   if (c.trigger || c.node?.label !== '广州市') {
//     popupVisible.value = v;
//   }
// };
const getNodePath = (nodeInfo) => {
  if (!nodeInfo.value || !singleTreeSelect.value) return;
  const path = singleTreeSelect.value.$refs.treeRef?.getPath(nodeInfo.value);
  return path.map((node) => node.data.label).join('/');
};
</script>

<template>
  <t-space direction="vertical">
    <!-- 选项过多时，可折叠 -->
    <t-select v-model="value" placeholder="请选择" multiple :min-collapsed-num="minCollapsedNum" :options="options" />

    <!-- 自定义折叠项内容，collapsedItems 为渲染函数 (value, count, collapsedSelectedItems) -->
    <t-select
      v-model="value"
      placeholder="请选择"
      multiple
      :min-collapsed-num="minCollapsedNum"
      :collapsed-items="collapsedItems"
      :options="options"
    />

    <!-- 自定义折叠项内容，collapsedItems 为 插槽(slot) { value, count, collapsedSelectedItems }-->
    <t-select v-model="value" placeholder="请选择" multiple :min-collapsed-num="minCollapsedNum" :options="options">
      <!-- hover展示折叠部分的已选项 -->
      <template #collapsedItems="{ collapsedSelectedItems, count }">
        <t-popup>
          <template #content>
            <p v-for="(item, index) in collapsedSelectedItems" :key="index" style="padding: 8px">
              {{ item }}
            </p>
          </template>
          <span v-show="count > 0" style="color: #00a870; margin-left: 8px">+{{ count }}</span>
        </t-popup>
      </template>
    </t-select>
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { SelectProps } from 'tdesign-vue-next';
const options: SelectProps['options'] = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
  },
];
const value = ref(['1', '3']);
const minCollapsedNum: SelectProps['minCollapsedNum'] = 1;
const collapsedItems: SelectProps['collapsedItems'] = (h, { value, count }) => {
  if (!(value instanceof Array) || !count) return;
  return (
    <t-popup
      v-slots={{
        content: () => {
          return value.map((item) => <p style="padding: 8px;">{item}</p>);
        },
      }}
    >
      <span v-show={count > 0} style="color: #ED7B2F; margin-left: 8px">
        +{count}
      </span>
    </t-popup>
  );
};
</script>

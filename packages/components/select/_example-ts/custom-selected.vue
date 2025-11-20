<template>
  <t-space direction="vertical">
    <!-- 自定义选中项内容，valueDisplay 为渲染函数（function） -->
    <t-select
      v-model="value1"
      :options="options"
      :value-display="valueDisplay"
      placeholder="请选择"
      multiple
      clearable
      :min-collapsed-num="2"
    />

    <!-- 自定义选中项内容，valueDisplay 为 插槽(slot) -->
    <t-select v-model="value2" :options="options" placeholder="请选择" multiple clearable>
      <template #valueDisplay="{ value, onClose }">
        <t-tag v-for="(item, index) in value" :key="index" :closable="true" :on-close="handleClose(index, onClose)">
          {{ item.label }}({{ item.value[0].toUpperCase() }})
        </t-tag>
      </template>
    </t-select>

    <t-select v-model="value3" :options="options" placeholder="请选择" clearable filterable>
      <template #valueDisplay="{ value }"> {{ value ? `单选自定义（${value}）` : '' }} </template>
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
  {
    label: '选项四',
    value: '4',
  },
  {
    label: '选项五',
    value: '5',
  },
  {
    label: '选项六',
    value: '6',
  },
  {
    label: '选项七',
    value: '7',
  },
  {
    label: '选项八',
    value: '8',
  },
  {
    label: '选项九',
    value: '9',
  },
];
const value1 = ref(['1', '2', '3']);
const value2 = ref(['4', '5', '6', '7']);
const value3 = ref('1');
const valueDisplay: SelectProps['valueDisplay'] = (h, { onClose, displayValue }) => {
  if (!(displayValue instanceof Array)) return;
  return displayValue.map(
    (
      item: {
        label: any;
        value: string[];
      },
      index: number,
    ) => (
      <t-tag
        key={index}
        closable={true}
        onClose={({ e }: { e: MouseEvent }) => {
          e.stopPropagation();
          onClose(index);
        }}
      >
        {item.label}({item.value[0].toUpperCase()})
      </t-tag>
    ),
  );
};
const handleClose =
  (index: number, onClose: (index: number) => void) =>
  ({ e }: { e: MouseEvent }) => {
    e.stopPropagation();
    onClose(index);
  };
</script>

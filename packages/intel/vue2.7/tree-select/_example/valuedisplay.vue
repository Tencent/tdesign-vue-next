<template>
  <t-space direction="vertical">
    <t-tree-select :data="options" v-model="value" clearable placeholder="请选择" style="width: 400px">
      <template #valueDisplay="{ value }" v-if="value"> {{ value.label }}({{ value.value }})</template>
    </t-tree-select>
    <t-tree-select
      :data="options"
      v-model="mulValue"
      multiple
      clearable
      filterable
      style="width: 400px"
      placeholder="请选择"
    >
      <template #valueDisplay="{ value, onClose }">
        <t-tag v-for="(item, index) in value" :key="index" closable :onClose="() => onClose(index)">
          {{ item.label }}({{ item.value }})
        </t-tag>
      </template>
    </t-tree-select>
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      value: 'shenzhen',
      mulValue: ['shenzhen', 'guangzhou'],
      options: [
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
      ],
    };
  },
};
</script>

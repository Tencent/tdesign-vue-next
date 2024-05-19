<template>
  <t-tree-select style="width: 300px" :data="options" :value="value" placeholder="请选择" />
</template>
<script>
const initialDefaultValue = ['shenzhen', 'guangzhou'];
// const defaultValue = 'guangzhou';

const initialOptions = [
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
];

export default {
  data() {
    return {
      value: initialDefaultValue,
      options: initialOptions,
    };
  },
};
</script>

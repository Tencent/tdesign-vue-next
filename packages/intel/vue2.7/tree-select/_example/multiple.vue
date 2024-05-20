<template>
  <t-tree-select v-model="value" :data="options" multiple clearable placeholder="请选择" @remove="handleRemove">
  </t-tree-select>
</template>
<script lang="jsx">
const OPTIONS = [
  { label: 'tdesign-vue', value: 1 },
  {
    label: 'tdesign-react',
    value: 2,
    children: [
      { label: 'tdesign-web-react', value: '2.1' },
      { label: 'tdesign-mobile-react', value: '2.2' },
    ],
  },
  { label: 'tdesign-miniprogram', value: 3 },
  // eslint-disable-next-line
  { label: (h) => <span>tdesign-mobile-react</span>, text: 'tdesign-mobile-react', value: '4' },
  { label: 'tdesign-angular', value: '5' },
  { label: 'tdesign-mobile-vue', value: '6' },
];
export default {
  data() {
    return {
      value: [1, 2, 3],
      options: OPTIONS,
    };
  },
  methods: {
    handleRemove(ctx) {
      console.log('移除选项', ctx);
    },
  },
};
</script>

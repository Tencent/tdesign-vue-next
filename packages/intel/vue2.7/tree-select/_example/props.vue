<template>
  <!-- :keys="treeProps.keys" -->
  <t-tree-select
    :data="options"
    v-model="value"
    clearable
    placeholder="请选择"
    :popupProps="popupProps"
    :treeProps="treeProps"
    style="width: 300px"
  />
</template>
<script>
export default {
  data() {
    return {
      value: 'shenzhen',
      options: [
        {
          name: '广东省',
          pinyin: 'guangdong',
          children: [
            {
              name: '广州市',
              pinyin: 'guangzhou',
            },
            {
              name: '深圳市',
              pinyin: 'shenzhen',
            },
          ],
        },
        {
          name: '江苏省',
          pinyin: 'jiangsu',
          children: [
            {
              name: '南京市',
              pinyin: 'nanjing',
            },
            {
              name: '苏州市',
              pinyin: 'suzhou',
            },
          ],
        },
      ],
      popupProps: {
        overlayInnerStyle: {
          width: '500px',
        },
      },
      treeProps: {
        keys: {
          label: 'name',
          value: 'pinyin',
          children: 'children',
        },
      },
    };
  },
};
</script>

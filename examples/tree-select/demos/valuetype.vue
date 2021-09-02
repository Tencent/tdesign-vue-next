<template>
  <div class="tdesign-tree-select-base">
    <t-tree-select
      :data="options"
      v-model="value"
      clearable
      valueType="object"
      placeholder="请选择"
    />
    <t-tree-select
      class="tree-select-multiple"
      :data="options"
      v-model="mulValue"
      clearable
      multiple
      valueType="object"
      placeholder="请选择"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: { label: '深圳市', value: 'shenzhen' },
      mulValue: [
        { label: '广州市', value: 'guangzhou' },
        { label: '深圳市', value: 'shenzhen' },
      ],
      options: [{
        label: '广东省',
        value: 'guangdong',
        children: [{
          label: '广州市',
          value: 'guangzhou',
        }, {
          label: '深圳市',
          value: 'shenzhen',
        }],
      }, {
        label: '江苏省',
        value: 'jiangsu',
        children: [{
          label: '南京市',
          value: 'nanjing',
        }, {
          label: '苏州市',
          value: 'suzhou',
        }],
      }],
    };
  },
};
</script>
<style scoped>
.tdesign-tree-select-base {
  width: 300px;
  margin: 0 20px;
}
.tree-select-multiple {
  margin-top: 20px;
}
</style>

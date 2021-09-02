<template>
  <div class="tdesign-tree-select-prefix">
    <t-tree-select
      v-model="value"
      :data="options"
      placeholder="请输入"
    >
      <template #prefixIcon>
        <t-icon name="user" />
      </template>
    </t-tree-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      options: [{
        label: '开发一组',
        value: 'group1',
        children: [{
          label: '小赵',
          value: 'zhao',
        }, {
          label: '小钱',
          value: 'qian',
        }],
      }, {
        label: '开发二组',
        value: 'group2',
        children: [{
          label: '小孙',
          value: 'sun',
        }, {
          label: '小李',
          value: 'li',
        }],
      }],
    };
  },
};
</script>
<style scoped>
.tdesign-tree-select-prefix {
  width: 300px;
  margin: 0 20px;
}
</style>

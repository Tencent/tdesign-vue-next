<template>
  <div>
    <t-dropdown :options="options" :minColumnWidth="95">
      <t-button>hover我试试</t-button>
    </t-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [{
        content: '选项一',
        value: 1,
        onClick: () => this.$message.success('选项一'),
      }, {
        content: '选项二',
        value: 2,
        onClick: () => this.$message.success('选项二'),
      }, {
        content: '选项三',
        value: 3,
        onClick: () => this.$message.success('选项三'),
      }, {
        content: '选项四',
        value: 4,
        onClick: () => this.$message.success('选项四'),
      }],
    };
  },
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>

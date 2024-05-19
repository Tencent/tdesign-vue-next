<template>
  <div>
    <t-dropdown :options="options" :minColumnWidth="88">
      <t-button variant="text">下拉菜单</t-button>
    </t-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          content: '操作一',
          value: 1,
          onClick: () => this.$message.success('操作一'),
        },
        {
          content: '操作二',
          value: 2,
          onClick: () => this.$message.success('操作二'),
        },
        {
          content: '操作三',
          value: 3,
          onClick: () => this.$message.success('操作三'),
        },
        {
          content: '操作四',
          value: 4,
          onClick: () => this.$message.success('操作四'),
        },
      ],
    };
  },
};
</script>

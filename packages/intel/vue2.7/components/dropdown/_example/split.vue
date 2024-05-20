<template>
  <div>
    <t-dropdown :options="options">
      <t-button theme="default" variant="outline">下拉菜单</t-button>
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
        },
        {
          content: '操作二',
          value: 2,
        },
        {
          content: '操作三',
          value: 3,
          divider: true,
        },
        {
          content: '操作四',
          value: 4,
        },
      ],
    };
  },
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>

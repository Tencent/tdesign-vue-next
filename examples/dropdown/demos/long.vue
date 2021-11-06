<template>
  <div>
    <t-dropdown :options="options" :maxHeight="400" :minColumnWidth="88" >
      <t-button variant="text">下拉菜单</t-button>
    </t-dropdown>
  </div>
</template>
<script lang="ts">
const options = Array.from({ length: 20 }).map((v, k) => ({
  content: `选项${k + 1}`,
  value: k + 1,
}));

export default{
  setup() {
    return {
      options
    }
  }
};
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>

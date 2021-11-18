<template>
  <t-dropdown
    :options="options"
    :min-column-width="88"
  >
    <t-button
      theme="default"
      variant="outline"
    >
      下拉菜单
    </t-button>
  </t-dropdown>
</template>
<script>
import { defineComponent } from 'vue';

const options = [{
  content: '操作一',
  value: 1,
}, {
  content: '操作二',
  value: 2,
}, {
  content: '操作三',
  value: 3,
  divider: true,
}, {
  content: '操作四',
  value: 4,
}];

export default defineComponent({
  setup() {
    return {
      options,
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>

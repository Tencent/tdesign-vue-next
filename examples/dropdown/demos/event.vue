<template>
  <div>
    <t-dropdown
      :options="options"
      :min-column-width="88"
    >
      <t-button variant="text">
        下拉菜单
      </t-button>
    </t-dropdown>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

const options = [{
  content: '选项一',
  value: 1,
  onClick: () => MessagePlugin.success('选项一'),
}, {
  content: '选项二',
  value: 2,
  onClick: () => MessagePlugin.success('选项二'),
}, {
  content: '选项三',
  value: 3,
  onClick: () => MessagePlugin.success('选项三'),
}, {
  content: '选项四',
  value: 4,
  onClick: () => MessagePlugin.success('选项四'),
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

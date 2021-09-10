<template>
  <t-dropdown :options="options" >
    <t-button theme="primary" variant="outline">
      <template #icon>
        <t-icon-ellipsis size="12"/>
      </template>
    </t-button>
  </t-dropdown>
</template>
<script>
import TIconEllipsis from '@tencent/tdesign-vue-next/lib/icon/ellipsis';

export default {
  components: {
    TIconEllipsis,
  },
  data() {
    return {
      options: [{
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

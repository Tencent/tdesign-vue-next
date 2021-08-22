<template>
  <div>
    <t-dropdown :options="options" >
      <t-button><t-icon-more slot="icon"/></t-button>
    </t-dropdown>
  </div>
</template>
<script>
import TIconMore from '@tencent/tdesign-vue-next/lib/icon/more';
export default {
  components: {
    TIconMore,
  },
  data() {
    return {
      options: [{
        text: '操作一',
        id: 1,
      }, {
        text: '操作二',
        id: 2,
      }, {
        text: '操作三',
        disabled: true,
        id: 3,
      }, {
        text: '额外操作四',
        id: 4,
        topSplit: true,
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

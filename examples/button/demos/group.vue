<template>
  <div class="demo-button-row">
    <div class="demo-button-col">
      <t-button variant="base">确定</t-button>
      <t-button>取消</t-button>
    </div>
    <div class="demo-button-col">
      <t-button variant="base">下一步</t-button>
      <t-button>上一步</t-button>
    </div>
    <div class="demo-button-col">
      <t-button variant="base">新建主机</t-button>
      <t-button>重装系统</t-button>
      <t-button>批量续费</t-button>
      <t-button><t-icon-more slot="icon"/></t-button>
    </div>
  </div>
</template>
<script>
import TIconMore from '@tencent/tdesign-vue/lib/icon/more';

export default {
  components: {
    TIconMore,
  },
};
</script>
<style scoped>
.demo-button-row {
  display: flex;
}
.demo-button-col + .demo-button-col {
  margin-left: 32px;
}
.t-button + .t-button {
  margin-left: 16px;
}
</style>

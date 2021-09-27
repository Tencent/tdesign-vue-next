
<template>
  <div class="tdesign-demo-shape">
    <div class="tdesign-demo-block">
      <div class="item"><t-button theme="primary" shape="square" variant="base">填充按钮</t-button></div>
      <div class="item"><t-button theme="primary" shape="round" variant="base">填充按钮</t-button></div>
      <div class="item">
        <t-button theme="primary" shape="circle" variant="base">
          <template #icon>
            <t-icon-calendar />
          </template>
        </t-button>
      </div>
    </div>
    <div class="tdesign-demo-block">
      <div class="item"><t-button shape="square" variant="outline">描边按钮</t-button></div>
      <div class="item"><t-button shape="round" variant="outline">描边按钮</t-button></div>
      <div class="item">
        <t-button shape="circle" variant="outline">
          <template #icon>
            <t-icon-calendar />
          </template>
        </t-button>
      </div>
    </div>
    <div class="tdesign-demo-block">
      <div class="item"><t-button shape="square" variant="dashed">虚框按钮</t-button></div>
      <div class="item"><t-button shape="round" variant="dashed">虚框按钮</t-button></div>
      <div class="item">
        <t-button shape="circle" variant="dashed">
          <template #icon>
            <t-icon-calendar />
          </template>
        </t-button>
      </div>
    </div>
    <div class="tdesign-demo-block">
      <div class="item"><t-button shape="square" variant="text">文字按钮</t-button></div>
      <div class="item"><t-button shape="round" variant="text">文字按钮</t-button></div>
      <div class="item">
        <t-button shape="circle" variant="text">
          <template #icon>
            <t-icon-calendar />
          </template>
        </t-button>
      </div>
    </div>
  </div>
</template>
<script>
import TIconCalendar from '@tencent/tdesign-vue-next/icon/calendar';

export default {
  components: {
    TIconCalendar,
  },
};
</script>
<style lang="less" scoped>
.tdesign-demo-shape {
  .t-button + .t-button {
    margin-left: 32px;
  }
  .tdesign-demo-block {
    margin-top: 16px;
    display: flex;
    .item {
      width: 150px;
    }
  }
}
</style>


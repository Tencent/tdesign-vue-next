<template>
  <div class="t-demo-tabs">
    <p class="t-demo-tabs__desc">基本选项卡</p>
    <t-tabs v-model="value">
      <t-tab-panel value="first" label="选项卡1">
        <p style="padding: 25px;">选项卡1</p>
      </t-tab-panel>
      <t-tab-panel value="second" label="选项卡2">
        <p style="padding: 25px;">选项卡2</p>
      </t-tab-panel>
      <t-tab-panel value="third" label="选项卡3">
        <p style="padding: 25px;">选项卡3</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 'first',
    };
  },
};
</script>

<style lang="less">
  .t-demo-tabs {

    &__desc {
      margin-bottom: 20px;
      color: #333;
      font-size: 14px;

      &:not(:first-of-type) {
        margin-top: 20px;
      }
    }
  }
</style>

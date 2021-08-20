<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <t-radio-group v-model="theme">
        <t-radio value="normal">常规型</t-radio>
        <t-radio value="card">卡片型</t-radio>
      </t-radio-group>
    </div>
    <t-tabs
      v-model="value"
      :theme="theme"
    >
      <t-tab-panel v-for="(item, index) in 20" :key="index" :value="index + ''" :label="`选项卡${index + 1}`">
        <p style="padding: 25px;">选项卡{{index + 1}}</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<style lang="less">
  .t-demo-tabs {

    &__desc {
      margin-bottom: 20px;
      color: #333;
      font-size: 14px;

      &:not(:first-of-type) {
        margin-top: 20px;
      }

      p {
        margin-bottom: 20px;
      }
    }
  }
</style>


<script>
export default {
  data() {
    return {
      theme: 'normal',
      value: '1',
    };
  },
};
</script>

<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <t-radio-group v-model="placement">
        <t-radio value="top">top</t-radio>
        <t-radio value="right">right</t-radio>
        <t-radio value="bottom">bottom</t-radio>
        <t-radio value="left">left</t-radio>
      </t-radio-group>
    </div>
    <t-tabs
      :value="value"
      :placement="placement"
      @change="(newValue) => value = newValue"
    >
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

    &__btn {
      margin-right: 20px;
    }
  }
</style>

<script>
export default {
  data() {
    return {
      placement: 'top',
      value: 'first',
    };
  },

  methods: {
    posBtnClick(index) {
      this.currPos = this.posArr[index];
    },
  },
};
</script>

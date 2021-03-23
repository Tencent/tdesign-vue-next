<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <p>目前支持medium，large两种类型选项卡</p>
      <t-button class="t-demo-tabs__btn" variant="outline" @click="() => sizeBtnClick(0)">
        {{ sizeArr[0] }}
      </t-button>
      <t-button class="t-demo-tabs__btn" variant="outline" @click="() => sizeBtnClick(1)">
        {{ sizeArr[1] }}
      </t-button>
    </div>
    <t-tabs
      :value="value1"
      :size="size"
      @change="(newValue) => value1 = newValue"
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
    <br />
    <t-tabs
      :value="value2"
      theme="card"
      :size="size"
      @change="(newValue) => value2 = newValue"
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
  }
</style>

<script>
export default {
  data() {
    return {
      sizeArr: ['medium', 'large'],
      size: 'medium',
      value1: 'first',
      value2: 'first',
    };
  },

  methods: {
    sizeBtnClick(index) {
      this.size = this.sizeArr[index];
    },
  },
};
</script>

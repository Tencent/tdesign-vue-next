<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <p>目前支持常规，卡片两种类型选项卡</p>
      <t-button variant="outline" @click="toggle">{{ desc }}</t-button>
    </div>
    <t-tabs
      :value="value"
      :theme="theme"
      @change="(newValue) => value = newValue"
    >
      <t-tab-panel value="1" label="选项卡1">
        <p style="padding: 25px;">选项卡1</p>
      </t-tab-panel>
      <t-tab-panel value="2" label="选项卡2">
        <p style="padding: 25px;">选项卡2</p>
      </t-tab-panel>
      <t-tab-panel value="3" label="选项卡3">
        <p style="padding: 25px;">选项卡3</p>
      </t-tab-panel>
      <t-tab-panel value="4" label="选项卡4">
        <p style="padding: 25px;">选项卡4</p>
      </t-tab-panel>
      <t-tab-panel value="5" label="选项卡5">
        <p style="padding: 25px;">选项卡5</p>
      </t-tab-panel>
      <t-tab-panel value="6" label="选项卡6">
        <p style="padding: 25px;">选项卡6</p>
      </t-tab-panel>
      <t-tab-panel value="7" label="选项卡7">
        <p style="padding: 25px;">选项卡7</p>
      </t-tab-panel>
      <t-tab-panel value="8" label="选项卡8">
        <p style="padding: 25px;">选项卡8</p>
      </t-tab-panel>
      <t-tab-panel value="9" label="选项卡9">
        <p style="padding: 25px;">选项卡9</p>
      </t-tab-panel>
      <t-tab-panel value="10" label="选项卡10">
        <p style="padding: 25px;">选项卡10</p>
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
      isCard: false,
      value: '1',
    };
  },

  computed: {
    desc() {
      return `切换到${this.isCard ? '常规型' : '卡片型'}选项卡`;
    },

    theme() {
      return this.isCard ? 'card' : 'normal';
    },
  },

  methods: {
    toggle() {
      this.isCard = !this.isCard;
    },
  },
};
</script>

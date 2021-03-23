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
      <t-tab-panel value="first" :label="`${theme}选项卡1`">
        <p style="padding: 25px;">{{ `${theme}选项卡1内容` }}</p>
      </t-tab-panel>
      <t-tab-panel value="second" :label="`${theme}选项卡2`" :disabled="true">
        <p style="padding: 25px;">{{ `${theme}选项卡2内容` }}</p>
      </t-tab-panel>
      <t-tab-panel value="third" :label="`${theme}选项卡3`">
        <p style="padding: 25px;">{{ `${theme}选项卡1内容` }}</p>
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
      value: 'first',
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

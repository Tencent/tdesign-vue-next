<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <p>目前支持常规，卡片两种类型选项卡</p>
      <t-button theme="line" @click="toggle">{{ desc }}</t-button>
    </div>
    <t-tabs
      activeName="first"
      :theme="theme"
    >
      <t-tab-panel name="first" :label="`${theme}选项卡1`">
        <p style="padding: 25px;">{{ `${theme}选项卡1内容` }}</p>
      </t-tab-panel>
      <t-tab-panel name="second" :label="`${theme}选项卡2`">
        <p style="padding: 25px;">{{ `${theme}选项卡2内容` }}</p>
      </t-tab-panel>
      <t-tab-panel name="third" :label="`${theme}选项卡3`">
        <p style="padding: 25px;">{{ `${theme}选项卡3内容` }}</p>
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

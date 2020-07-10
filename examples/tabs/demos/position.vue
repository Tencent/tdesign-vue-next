<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <p>目前支持上下左右四个方向，但仅支持常规型选项卡</p>
      <t-button class="t-demo-tabs__btn" theme="line" @click="() => posBtnClick(0)">
        {{ posArr[0] }}
      </t-button>
      <t-button class="t-demo-tabs__btn" theme="line" @click="() => posBtnClick(1)">
        {{ posArr[1] }}
      </t-button>
      <t-button class="t-demo-tabs__btn" theme="line" @click="() => posBtnClick(2)">
        {{ posArr[2] }}
      </t-button>
      <t-button class="t-demo-tabs__btn" theme="line" @click="() => posBtnClick(3)">
        {{ posArr[3] }}
      </t-button>
    </div>
    <t-tabs
      activeName="first"
      :tabPosition="currPos"
    >
      <t-tab-panel name="first" label="选项卡1">
        <p style="padding: 25px;">选项卡1</p>
      </t-tab-panel>
      <t-tab-panel name="second" label="选项卡2">
        <p style="padding: 25px;">选项卡2</p>
      </t-tab-panel>
      <t-tab-panel name="third" label="选项卡3">
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
      posArr: ['top', 'right', 'bottom', 'left'],
      currPos: 'top',
    };
  },

  methods: {
    posBtnClick(index) {
      this.currPos = this.posArr[index];
    },
  },
};
</script>

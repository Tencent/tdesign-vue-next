<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <t-radio-group
        v-model="size"
        variant="default-filled"
      >
        <t-radio-button value="medium">
          medium
        </t-radio-button>
        <t-radio-button value="large">
          large
        </t-radio-button>
      </t-radio-group>
    </div>
    <t-tabs
      v-model="value1"
      :size="size"
    >
      <t-tab-panel
        value="first"
        label="选项卡1"
      >
        <p style="padding: 25px;">
          选项卡1
        </p>
      </t-tab-panel>
      <t-tab-panel
        value="second"
        label="选项卡2"
      >
        <p style="padding: 25px;">
          选项卡2
        </p>
      </t-tab-panel>
      <t-tab-panel
        value="third"
        label="选项卡3"
      >
        <p style="padding: 25px;">
          选项卡3
        </p>
      </t-tab-panel>
    </t-tabs>
    <br>
    <t-tabs
      v-model="value2"
      theme="card"
      :size="size"
    >
      <t-tab-panel
        value="first"
        label="选项卡1"
      >
        <p style="padding: 25px;">
          选项卡1
        </p>
      </t-tab-panel>
      <t-tab-panel
        value="second"
        label="选项卡2"
      >
        <p style="padding: 25px;">
          选项卡2
        </p>
      </t-tab-panel>
      <t-tab-panel
        value="third"
        label="选项卡3"
      >
        <p style="padding: 25px;">
          选项卡3
        </p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const size = ref('medium');
    const value1 = ref('first');
    const value2 = ref('first');

    return {
      size,
      value1,
      value2,
    };
  },
});
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

      p {
        margin-bottom: 20px;
      }
    }
  }
</style>

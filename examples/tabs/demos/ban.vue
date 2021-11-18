<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <t-radio-group
        v-model="theme"
        variant="default-filled"
      >
        <t-radio-button value="normal">
          常规型
        </t-radio-button>
        <t-radio-button value="card">
          卡片型
        </t-radio-button>
      </t-radio-group>
    </div>
    <t-tabs
      :value="value"
      :theme="theme"
      @change="handlerChange"
    >
      <t-tab-panel
        value="first"
        :label="`${theme}选项卡1`"
      >
        <p style="padding: 25px;">
          {{ `${theme}选项卡1内容` }}
        </p>
      </t-tab-panel>
      <t-tab-panel
        value="second"
        :label="`${theme}选项卡2`"
        :disabled="true"
      >
        <p style="padding: 25px;">
          {{ `${theme}选项卡2内容` }}
        </p>
      </t-tab-panel>
      <t-tab-panel
        value="third"
        :label="`${theme}选项卡3`"
      >
        <p style="padding: 25px;">
          {{ `${theme}选项卡1内容` }}
        </p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('first');
    const theme = ref('normal');

    const handlerChange = (newValue) => {
      value.value = newValue;
    };

    return {
      handlerChange,
      theme,
      value,
    };
  },
});
</script>
<style lang="less" scoped>
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

<template>
  <div class="t-demo-tabs">
    <div class="t-demo-tabs__desc">
      <t-radio-group variant="default-filled" v-model="theme">
        <t-radio-button value="normal">常规型</t-radio-button>
        <t-radio-button value="card">卡片型</t-radio-button>
      </t-radio-group>
    </div>
    <t-tabs
      v-model="value"
      :theme="theme"
    >
      <t-tab-panel v-for="index in 20" :key="index" :value="index + ''" :label="`选项卡${index + 1}`">
        <p style="padding: 25px;">选项卡{{index + 1}}</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('1');
    const theme = ref('normal');

    return {
      theme,
      value
    };
  }
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


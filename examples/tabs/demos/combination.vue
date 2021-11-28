<template>
  <div class="tdesign-demo-block-column-large" style="width: 100%">
    <div>
      <t-radio-group v-model="theme" variant="default-filled">
        <t-radio-button value="normal"> 常规型 </t-radio-button>
        <t-radio-button value="card"> 卡片型 </t-radio-button>
      </t-radio-group>
    </div>
    <t-tabs v-model="value" :theme="theme">
      <t-tab-panel v-for="index in 20" :key="index" :value="index + ''" :label="`选项卡${index + 1}`">
        <p style="padding: 25px">选项卡{{ index + 1 }}</p>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value = ref('1');
    const theme = ref('normal');

    return {
      theme,
      value,
    };
  },
});
</script>

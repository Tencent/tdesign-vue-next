<template>
  <div class="tdesign-demo-block-column-large">
    <div>
      <t-radio-group v-model="theme" variant="default-filled">
        <t-radio-button value="normal"> 常规型 </t-radio-button>
        <t-radio-button value="card"> 卡片型 </t-radio-button>
      </t-radio-group>
    </div>

    <t-tabs :value="value" :theme="theme" @change="(newValue) => (value = newValue)">
      <t-tab-panel value="first" :label="`选项卡1`">
        <p style="padding: 25px">{{ `选项卡1的内容` }}</p>
      </t-tab-panel>
      <t-tab-panel value="second" :label="`选项卡2`" :disabled="true">
        <p style="padding: 25px">{{ `选项卡2的内容` }}</p>
      </t-tab-panel>
      <t-tab-panel value="third" :label="`选项卡3`">
        <p style="padding: 25px">{{ `选项卡3的内容` }}</p>
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

    return {
      theme,
      value,
    };
  },
});
</script>

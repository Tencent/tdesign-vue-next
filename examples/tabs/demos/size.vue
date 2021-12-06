<template>
  <div class="tdesign-demo-block-column-large">
    <div class="tdesign-demo-block-column">
      <t-tabs :value="value1" size="medium" @change="(newValue) => (value1 = newValue)">
        <t-tab-panel value="first" label="选项卡1">
          <p style="padding: 25px">选项卡1</p>
        </t-tab-panel>
        <t-tab-panel value="second" label="选项卡2">
          <p style="padding: 25px">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel value="third" label="选项卡3">
          <p style="padding: 25px">选项卡3</p>
        </t-tab-panel>
      </t-tabs>

      <t-tabs :value="value2" size="large" @change="(newValue) => (value2 = newValue)">
        <t-tab-panel value="first" label="选项卡1">
          <p style="padding: 25px">选项卡1</p>
        </t-tab-panel>
        <t-tab-panel value="second" label="选项卡2">
          <p style="padding: 25px">选项卡2</p>
        </t-tab-panel>
        <t-tab-panel value="third" label="选项卡3">
          <p style="padding: 25px">选项卡3</p>
        </t-tab-panel>
      </t-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const value1 = ref('first');
    const value2 = ref('first');

    return {
      value1,
      value2,
    };
  },
});
</script>

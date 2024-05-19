<template>
  <t-space direction="vertical">
    <t-tabs :value="value1" @change="(newValue) => (value1 = newValue)">
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

    <t-tabs :value="value2" theme="card" @change="(newValue) => (value2 = newValue)">
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
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      value1: 'first',
      value2: 'first',
    };
  },
};
</script>

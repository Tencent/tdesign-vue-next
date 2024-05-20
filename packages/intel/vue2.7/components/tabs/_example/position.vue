<template>
  <t-space direction="vertical" size="32px">
    <t-space>
      <t-radio-group variant="default-filled" v-model="placement">
        <t-radio-button value="top">top</t-radio-button>
        <t-radio-button value="right">right</t-radio-button>
        <t-radio-button value="bottom">bottom</t-radio-button>
        <t-radio-button value="left">left</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-tabs :value="value" :placement="placement" @change="(newValue) => (value = newValue)">
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
      placement: 'top',
      value: 'first',
    };
  },
};
</script>

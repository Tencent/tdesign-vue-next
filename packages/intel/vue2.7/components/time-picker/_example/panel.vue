<template>
  <t-space direction="vertical">
    <t-radio-group v-model="usage" variant="default-filled">
      <t-radio-button value="single">单独使用面板</t-radio-button>
      <t-radio-button value="combine">组合其他组件使用</t-radio-button>
    </t-radio-group>
    <t-time-picker-panel :value="value" @change="handleChange" v-if="usage === 'single'" />
    <t-popup v-else>
      <t-input :style="{ width: '200px' }" :value="inputValue" readonly placeholder="配合输入框组件组合使用"></t-input>
      <t-time-picker-panel slot="content" :value="value" @change="handleChange" />
    </t-popup>
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      usage: 'single',
      value: '11:11:11',
      inputValue: '',
    };
  },
  methods: {
    handleChange(v) {
      this.value = v;
      this.inputValue = v;
    },
  },
};
</script>

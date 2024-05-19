<template>
  <t-space direction="vertical">
    <t-radio-group v-model="usage" variant="default-filled">
      <t-radio-button value="single">单独使用面板</t-radio-button>
      <t-radio-button value="combine">组合其他组件使用</t-radio-button>
    </t-radio-group>
    <t-time-picker-panel v-if="usage === 'single'" :value="value" @change="handleChange" />
    <t-popup v-else>
      <t-input :style="{ width: '200px' }" :value="inputValue" readonly placeholder="配合输入框组件组合使用"></t-input>
      <template #content>
        <t-time-picker-panel :value="value" @change="handleChange" />
      </template>
    </t-popup>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TimePickerPanelProps, InputProps } from 'tdesign-vue-next';
const value = ref<TimePickerPanelProps['value']>('11:11:11');
const usage = ref('single');
const inputValue = ref<InputProps['value']>('');
const handleChange: TimePickerPanelProps['onChange'] = (v) => {
  value.value = v;
  inputValue.value = v;
};
</script>

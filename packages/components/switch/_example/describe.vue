<template>
  <t-space direction="vertical">
    <t-space>
      <t-switch v-model="slotChecked" size="large">
        <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
      </t-switch>
      <t-switch size="large">
        <template #label="slotProps">
          <template v-if="slotProps.value">
            <check-icon />
          </template>
          <template v-else>
            <close-icon />
          </template>
        </template>
      </t-switch>
    </t-space>

    <t-space>
      <t-switch v-model="checked" size="large" :label="['开', '关']"></t-switch>
      <t-switch size="large" :label="['开', '关']"></t-switch>
    </t-space>

    <t-space>
      <t-switch v-model="renderChecked" size="large" :label="[renderActiveContent, renderInactiveContent]"></t-switch>
      <t-switch size="large" :label="[renderActiveContent, renderInactiveContent]"></t-switch>
    </t-space>

    <t-space>
      <t-switch v-model="renderChecked2" size="large" :label="renderContent"></t-switch>
      <t-switch size="large" :label="renderContent"></t-switch>
    </t-space>
  </t-space>
</template>
<script lang="tsx" setup>
import { ref } from 'vue';
import { SwitchProps } from 'tdesign-vue-next';
import { CloseIcon, CheckIcon } from 'tdesign-icons-vue-next';
const checked = ref(true);
const renderChecked = ref(true);
const renderChecked2 = ref(true);
const slotChecked = ref(true);
const renderActiveContent = () => {
  return <CheckIcon />;
};
const renderInactiveContent = () => {
  return <CloseIcon />;
};
const renderContent: SwitchProps['label'] = (h, data) => {
  return data.value ? <CheckIcon /> : <CloseIcon />;
};
</script>

<style scoped>
.switch-demo .tdesign-demo-block {
  width: 150px;
  display: flex;
  justify-content: space-around;
}
</style>

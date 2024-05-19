<template>
  <t-space direction="vertical">
    <div class="tdesign-demo-block-row">
      <t-switch size="large" v-model="slotChecked">
        <template v-slot:label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
      </t-switch>
      <t-switch size="large">
        <template v-slot:label="slotProps">
          <template v-if="slotProps.value">
            <check-icon />
          </template>
          <template v-else>
            <close-icon />
          </template>
        </template>
      </t-switch>
    </div>

    <div class="tdesign-demo-block-row">
      <t-switch size="large" v-model="checked" :label="['开', '关']"></t-switch>
      <t-switch size="large" :label="['开', '关']"></t-switch>
    </div>

    <div class="tdesign-demo-block-row">
      <t-switch size="large" v-model="renderChecked" :label="[renderActiveContent, renderInactiveContent]"></t-switch>
      <t-switch size="large" :label="[renderActiveContent, renderInactiveContent]"></t-switch>
    </div>

    <div class="tdesign-demo-block-row">
      <t-switch size="large" v-model="renderChecked2" :label="renderContent"></t-switch>
      <t-switch size="large" :label="renderContent"></t-switch>
    </div>
  </t-space>
</template>
<script setup lang="jsx">
import { ref } from 'vue';
import { CloseIcon, CheckIcon } from 'tdesign-icons-vue';

const checked = ref(true);
const renderChecked = ref(true);
const renderChecked2 = ref(true);
const slotChecked = ref(true);
const renderActiveContent = () => <CheckIcon />;
const renderInactiveContent = () => <CloseIcon />;
const renderContent = (h, data) => data.value ? <CheckIcon /> : <CloseIcon />;
</script>

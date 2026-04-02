<template>
  <t-space class="adornment-select" direction="vertical">
    <t-input-adornment :prepend="protocolSelect">
      <t-input placeholder="请输入内容" />
    </t-input-adornment>

    <t-input-adornment :append="tldSelect">
      <t-tag-input placeholder="请输入内容" />
    </t-input-adornment>

    <t-input-adornment :prepend="protocolSelect" :append="tldSelect">
      <t-select
        :options="['tencent', 'qq', 'cloud.tencent'].map((value) => ({ label: value, value }))"
        default-value="tencent"
      />
    </t-input-adornment>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { InputAdornmentProps } from 'tdesign-vue-next';
const protocolSelect = ref<InputAdornmentProps['prepend']>(() => (
  <t-select
    autoWidth
    options={['http://', 'https://'].map((value) => ({
      label: value,
      value,
    }))}
    defaultValue="http://"
  />
));
const tldSelect = ref<InputAdornmentProps['append']>(() => (
  <t-select
    autoWidth
    options={['.com', '.cn', '.net', '.org'].map((value) => ({
      label: value,
      value,
    }))}
    defaultValue=".cn"
  />
));
</script>

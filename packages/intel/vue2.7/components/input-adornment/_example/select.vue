<template>
  <t-space direction="vertical" class="adornment-select" style="max-width: 500px">
    <t-input-adornment :prepend="protocolSelect">
      <t-input placeholder="请输入内容" />
    </t-input-adornment>

    <t-input-adornment :append="tldSelect">
      <t-tag-input placeholder="请输入内容" />
    </t-input-adornment>

    <t-input-adornment :prepend="protocolSelect" :append="tldSelect">
      <t-select
        :options="['tencent', 'qq', 'cloud.tencent'].map((value) => ({ label: value, value }))"
        defaultValue="tencent"
      />
    </t-input-adornment>
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      protocolSelect: () => (
        <t-select
          autoWidth
          options={['http://', 'https://'].map((value) => ({ label: value, value }))}
          defaultValue="http://"
        />
      ),
      tldSelect: () => (
        <t-select
          autoWidth
          options={['.com', '.cn', '.net', '.org'].map((value) => ({ label: value, value }))}
          defaultValue=".cn"
        />
      ),
    };
  },
};
</script>

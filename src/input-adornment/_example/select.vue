<template>
  <div class="tdesign-demo-block-column adornment-select" style="max-width: 500px">
    <t-input-adornment :prepend="protocolSelect">
      <t-input placeholder="请输入内容" />
    </t-input-adornment>

    <t-input-adornment :append="tldSelect">
      <t-tag-input placeholder="请输入内容" />
    </t-input-adornment>

    <t-input-adornment class="1" :prepend="protocolSelect" :append="tldSelect">
      <t-select
        :options="['tencent', 'qq', 'cloud.tencent'].map((value) => ({ label: value, value }))"
        default-value="tencent"
      />
    </t-input-adornment>
  </div>
</template>

<script lang="jsx" setup>
import { ref } from 'vue';

const protocolSelect = ref(() => (
  <t-select
    bordered={false}
    autoWidth
    options={['http://', 'https://'].map((value) => ({ label: value, value }))}
    defaultValue="http://"
  />
));

const tldSelect = ref(() => (
  <t-select
    bordered={false}
    autoWidth
    options={['.com', '.cn', '.net', '.org'].map((value) => ({ label: value, value }))}
    defaultValue=".cn"
  />
));
</script>

<style lang="less">
.tdesign-demo-block-column.adornment-select {
  .t-input-adornment {
    .t-input-adornment__prepend,
    .t-input-adornment__append {
      transition: background-color 0.3s;
      &:hover {
        background-color: var(--td-bg-color-secondarycontainer-hover);
      }
      .t-select__wrap {
        .t-select {
          .t-input:hover:not(.t-is-disabled) {
            .t-fake-arrow {
              color: var(--td-text-color-placeholder);
            }
          }
        }
      }
    }
  }
}
</style>

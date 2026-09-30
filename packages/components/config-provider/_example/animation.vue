<template>
  <t-space direction="vertical" size="large">
    <t-space direction="vertical">
      <strong>默认动画</strong>
      <t-space align="center">
        <t-button theme="primary">水波纹动画</t-button>
        <t-dropdown :options="options" trigger="click">
          <t-button variant="outline">展开动画</t-button>
        </t-dropdown>
        <t-button variant="text" @click="defaultDialogVisible = true">渐变动画</t-button>
      </t-space>
      <t-dialog v-model:visible="defaultDialogVisible" header="默认渐变动画" body="打开和关闭对话框时保留渐变动画。" />
    </t-space>

    <t-config-provider :global-config="globalConfig">
      <t-space direction="vertical">
        <strong>关闭动画</strong>
        <t-space align="center">
          <t-button theme="primary">无水波纹动画</t-button>
          <t-dropdown :options="options" trigger="click">
            <t-button variant="outline">无展开动画</t-button>
          </t-dropdown>
          <t-button variant="text" @click="disabledDialogVisible = true">无渐变动画</t-button>
        </t-space>
        <t-dialog
          v-model:visible="disabledDialogVisible"
          header="已关闭渐变动画"
          body="打开和关闭对话框时不再执行渐变动画。"
        />
      </t-space>
    </t-config-provider>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { DropdownProps, GlobalConfigProvider } from 'tdesign-vue-next';

const defaultDialogVisible = ref(false);
const disabledDialogVisible = ref(false);
const options: DropdownProps['options'] = [
  { content: '操作一', value: 1 },
  { content: '操作二', value: 2 },
  { content: '操作三', value: 3 },
];

// ripple 为点击水波纹，expand 为展开动画，fade 为渐变动画
// 将不需要的动画写入 exclude 即可关闭，也可通过 include 只保留需要的动画
const globalConfig: GlobalConfigProvider = {
  animation: {
    exclude: ['ripple', 'expand', 'fade'],
  },
};
</script>

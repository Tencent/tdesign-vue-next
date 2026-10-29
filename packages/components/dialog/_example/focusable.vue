<template>
  <t-space direction="vertical" :size="24">
    <t-space align="center">
      <span class="dialog-focusable-label">打开后的焦点</span>
      <t-radio-group v-model="defaultFocus" size="small" variant="default-filled">
        <t-radio-button v-for="item in focusOptions" :key="item.value" :value="item.value">
          {{ item.label }}
        </t-radio-button>
      </t-radio-group>
    </t-space>
    <t-space align="center">
      <span class="dialog-focusable-label">限制焦点在对话框内</span>
      <t-switch v-model="focusTrap" />
    </t-space>
    <t-space align="center">
      <span class="dialog-focusable-label">关闭后聚焦触发元素</span>
      <t-switch v-model="focusTriggerAfterClose" />
    </t-space>
    <t-button
      theme="primary"
      :style="getFocusStyle(triggerFocused)"
      @focus="triggerFocused = true"
      @blur="triggerFocused = false"
      @click="openDialog"
    >
      打开对话框
    </t-button>
  </t-space>

  <t-dialog
    v-model:visible="visible"
    :close-on-esc-keydown="true"
    :dialog-style="getFocusStyle(focusedTarget === 'dialog')"
    :confirm-btn="confirmBtn"
    :cancel-btn="cancelBtn"
    :focusable="focusable"
    @confirm="visible = false"
    @close="visible = false"
  >
    <strong style="display: block; margin-bottom: 24px">{{ currentFocusOption.description }}</strong>
    <t-input ref="inputRef" @focus="focusedTarget = 'input'" @blur="focusedTarget = null" />
  </t-dialog>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { ButtonProps, DialogFocusable } from 'tdesign-vue-next';

const focusOptions = [
  {
    value: 'dialog',
    label: '对话框容器',
    description: '默认行为，打开后聚焦对话框容器。',
  },
  {
    value: 'confirm-button',
    label: '确认按钮',
    description: '打开后聚焦确认按钮，按 Enter 可直接触发确认操作。',
  },
  {
    value: 'cancel-button',
    label: '取消按钮',
    description: '打开后聚焦取消按钮，按 Enter 可直接触发取消操作。',
  },
  {
    value: 'input',
    label: '输入框',
    description: '打开后聚焦输入框，可直接开始输入内容。',
  },
  {
    value: 'none',
    label: '不主动聚焦',
    description: '打开后不移动焦点，焦点仍停留在触发按钮上。',
  },
] as const;

type DefaultFocus = typeof focusOptions[number]['value'];

const getFocusStyle = (focused: boolean) => ({
  outline: focused ? '2px solid var(--td-brand-color)' : '2px solid transparent',
  outlineOffset: '2px',
});

const inputRef = ref<{ $el?: HTMLElement }>();
const visible = ref(false);
const defaultFocus = ref<DefaultFocus>('dialog');
const focusTrap = ref(false);
const focusTriggerAfterClose = ref(false);
const triggerFocused = ref(false);
const focusedTarget = ref<DefaultFocus | null>(null);

const currentFocusOption = computed(
  () => focusOptions.find((item) => item.value === defaultFocus.value) ?? focusOptions[0],
);

const getDefaultFocus = (): DialogFocusable['defaultFocus'] => {
  if (defaultFocus.value === 'dialog') return undefined;
  if (defaultFocus.value === 'none') return null;
  if (defaultFocus.value === 'input') return () => inputRef.value?.$el?.querySelector('input') ?? null;
  return defaultFocus.value;
};

const focusable = computed<DialogFocusable>(() => ({
  defaultFocus: getDefaultFocus(),
  focusTrap: focusTrap.value,
  focusTriggerAfterClose: focusTriggerAfterClose.value,
}));

const confirmBtn = computed<ButtonProps>(() => ({
  content: '确认',
  style: getFocusStyle(focusedTarget.value === 'confirm-button'),
  onFocus: () => {
    focusedTarget.value = 'confirm-button';
  },
  onBlur: () => {
    focusedTarget.value = null;
  },
}));

const cancelBtn = computed<ButtonProps>(() => ({
  content: '取消',
  style: getFocusStyle(focusedTarget.value === 'cancel-button'),
  onFocus: () => {
    focusedTarget.value = 'cancel-button';
  },
  onBlur: () => {
    focusedTarget.value = null;
  },
}));

const openDialog = () => {
  focusedTarget.value = defaultFocus.value === 'none' ? null : defaultFocus.value;
  visible.value = true;
};
</script>

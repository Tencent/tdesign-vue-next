<template>
  <t-space direction="vertical" class="t-demo__input-status" style="max-width: 500px">
    <!-- 内置 -->
    <t-input
      v-model="input1"
      :maxlength="5"
      show-limit-number
      clearable
      placeholder="内置字数限制，最大文本长度，一个中文字等于一个长度"
      @compositionend="onCompositionend"
    />

    <t-input
      v-model="input2"
      :maxcharacter="10"
      show-limit-number
      placeholder="内置字数限制，最大字符数量限制，一个中文字等于两个字符"
    />

    <t-input
      v-model="input3"
      :maxlength="5"
      show-limit-number
      allow-input-over-max
      placeholder="内置字数限制，字数超出时允许继续输入"
      :tips="errorTips"
      :status="errorTips ? 'error' : ''"
      @validate="onValidate"
    />

    <!-- 自定义 -->
    <t-input v-model="input4" :maxlength="5" :suffix="suffix" placeholder="自定义字数限制文本" />
  </t-space>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { InputProps } from 'tdesign-vue-next';
const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');
const errorTips = ref<InputProps['tips']>('');
const suffix = computed<InputProps['suffix']>(() => {
  return `${input4.value.length}/5`;
});
const onValidate: InputProps['onValidate'] = ({ error }) => {
  errorTips.value = error ? '输入内容长度不允许超过 5 个字' : '';
};
const onCompositionend: InputProps['onCompositionend'] = () => {
  console.log('onCompositionend');
};
</script>

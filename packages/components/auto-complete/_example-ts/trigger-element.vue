<template>
  <div>
    <!-- 下拉浮层默认触发方式为 focus，如果期望更为其他，可以设置 :popupProps="{ trigger: 'click' }" -->
    <t-auto-complete v-model="value" :options="options" highlight-keyword @change="onChange">
      <t-textarea v-model="value" placeholder="自定义联想词触发元素"></t-textarea>
    </t-auto-complete>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { AutoCompleteProps } from 'tdesign-vue-next';
const value = ref('');
const timer = ref(null);
const options = ref<AutoCompleteProps['options']>([
  'First AutoComplete Textarea',
  'Second AutoComplete Textarea',
  'Third AutoComplete Textarea',
]);

// 输入框内容发生变化时进行搜索，200ms 搜索一次
function onChange(value: string) {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    const text = 'AutoComplete Textarea';
    const pureValue = value.replace(`First ${text}`, '').replace(`Second ${text}`, '').replace(`Third ${text}`, '');
    options.value = [`${pureValue}First ${text}`, `${pureValue}Second ${text}`, `${pureValue}Third ${text}`];
    clearTimeout(timer.value);
  }, 200);
}
</script>

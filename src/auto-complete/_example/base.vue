<template>
  <div>
    <t-auto-complete
      v-model="value"
      :options="options"
      highlight-keyword
      placeholder="请输入关键词搜索"
      @change="onChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const options = ref(['第一个默认联想词', '第二个默认联想词', '第三个默认联想词']);
const timer = ref(null);

// 输入框内容发生变化时进行搜索，200ms 搜索一次
function onChange(value) {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    const text = '搜索联想词';
    const pureValue = value.replace(`第一个${text}`, '').replace(`第二个${text}`, '').replace(`第三个${text}`, '');

    options.value = [`${pureValue}第一个${text}`, `${pureValue}第二个${text}`, `${pureValue}第三个${text}`];
    clearTimeout(timer.value);
  }, 200);
}
</script>

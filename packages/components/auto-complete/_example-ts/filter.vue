<template>
  <t-space>
    <!-- 组件内置的过滤规则：不区分大小写，文本任意位置匹配 -->
    <t-auto-complete
      v-model="value1"
      :options="options"
      highlight-keyword
      filterable
      placeholder="组件默认过滤规则（不区分大小写）"
      style="width: 280px"
    />

    <!-- 外部自定义过滤规则：区分大小写，文本开始位置匹配 -->
    <t-auto-complete
      v-model="value2"
      :options="options"
      :filter="filterWords"
      highlight-keyword
      placeholder="自定义过滤规则（区分大小写）"
      style="width: 280px"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { AutoCompleteProps } from 'tdesign-vue-next';
const LIST = ['第一个 AutoComplete 默认联想词', '第二个 AutoComplete 默认联想词', '第三个 AutoComplete 默认联想词'];
const value1 = ref('');
const value2 = ref('');
const options = ref<AutoCompleteProps<string>['options']>([...LIST]);
function filterWords(keyword: string, option: { text: string }) {
  const regExp = new RegExp(keyword);
  return regExp.test(option.text);
}
</script>

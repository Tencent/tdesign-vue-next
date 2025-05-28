<template>
  <t-space direction="vertical">
    <t-textarea
      v-model="value"
      tips="这里可以放一些提示文字"
      placeholder="请输入描述文案，文本长度最多20，maxlength=20"
      :maxlength="20"
    ></t-textarea>

    <t-textarea
      v-model="value2"
      placeholder="请输入描述文案，最多20字符（一个汉字占两个字符长度），maxcharacter=20"
      :maxcharacter="20"
    ></t-textarea>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref('');
const value2 = ref('');
</script>

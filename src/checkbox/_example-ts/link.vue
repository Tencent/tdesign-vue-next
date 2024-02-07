<template>
  <t-space direction="vertical">
    <p>选中值: {{ checked }}</p>
    <!-- name 非必需 -->
    <t-checkbox-group v-model="checked" :options="['选项一', '选项二', '选项三']" name="city"></t-checkbox-group>
    <t-button size="small" @click="checked = ['选项二']">重置</t-button>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
const checked = ref(['选项二']);
</script>

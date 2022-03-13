<template>
  <div>
    <t-form>
      <t-form-item label="禁用">
        <t-input-number v-model="value0" disabled></t-input-number>
      </t-form-item>
      <t-form-item label="只读">
        <t-input-number v-model="value1" readonly></t-input-number>
      </t-form-item>
      <t-form-item label="正常">
        <t-input-number v-model="value2"></t-input-number>
      </t-form-item>
      <t-form-item label="成功">
        <t-input-number v-model="value3" status="success"></t-input-number>
      </t-form-item>
      <t-form-item label="警告">
        <t-input-number v-model="value4" status="warning"></t-input-number>
      </t-form-item>
      <t-form-item label="错误">
        <t-input-number v-model="value5" status="error"></t-input-number>
      </t-form-item>
      <t-form-item label="正常提示">
        <t-input-number v-model="value6" tips="这是普通文本提示"></t-input-number>
      </t-form-item>
      <t-form-item label="成功提示">
        <t-input-number v-model="value7" status="success" tips="校验通过文本提示"></t-input-number>
      </t-form-item>
      <t-form-item label="警告提示">
        <t-input-number v-model="value8" status="warning" tips="校验不通过文本提示"></t-input-number>
      </t-form-item>
      <t-form-item label="错误提示">
        <t-input-number v-model="value9" status="error" tips="校验存在严重问题文本提示"></t-input-number>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value0 = ref(3);
const value1 = ref(3);
const value2 = ref(3);
const value3 = ref(3);
const value4 = ref(3);
const value5 = ref(3);
const value6 = ref(3);
const value7 = ref(3);
const value8 = ref(3);
const value9 = ref(3);
</script>

<style scoped>
.t-form__item {
  margin-bottom: 0px;
}

.t-input-number {
  width: 300px;
}
.tdesign-demo-item--input-number .t-input-number {
  margin-bottom: 16px;
}
</style>

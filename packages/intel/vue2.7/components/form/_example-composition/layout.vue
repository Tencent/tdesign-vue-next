<template>
  <t-space direction="vertical" size="32px">
    <t-radio-group v-model="formData.layout" variant="default-filled">
      <t-radio-button value="vertical">纵向布局</t-radio-button>
      <t-radio-button value="inline">行内布局</t-radio-button>
    </t-radio-group>

    <t-form
      :data="formData"
      labelWidth="calc(2em + 24px)"
      :layout="formData.layout"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      scrollToFirstError="smooth"
    >
      <t-form-item label="姓名" name="name">
        <t-input v-model="formData.name" placeholder="请输入姓名"></t-input>
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input v-model="formData.password" type="password" placeholder="请输入密码"></t-input>
      </t-form-item>
    </t-form>
  </t-space>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue';
import { reactive } from 'vue';

const INITIAL_DATA = {
  layout: 'inline',
  name: '',
  password: '',
};
const formData = reactive({
  ...INITIAL_DATA,
});
const onReset = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.warning(firstError);
  }
};
</script>

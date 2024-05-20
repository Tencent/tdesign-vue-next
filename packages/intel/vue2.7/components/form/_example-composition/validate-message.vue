<template>
  <!-- error-message 非必需 -->
  <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit" scrollToFirstError="smooth">
    <t-form-item label="用户名" help="这里可以展示一段说明文字" name="account">
      <t-input v-model="formData.account" placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="个人简介" help="请用一句话介绍自己" name="description">
      <t-input v-model="formData.description" placeholder="请输入个人简介"></t-input>
    </t-form-item>
    <t-form-item label="密码" name="password">
      <t-input type="password" v-model="formData.password" placeholder="请输入密码"></t-input>
    </t-form-item>
    <t-form-item style="margin-left: 100px">
      <t-space size="10px">
        <t-button theme="primary" type="submit">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
        <t-button theme="default" variant="base" @click="handleValidateMessage">设置校验信息提示</t-button>
      </t-space>
    </t-form-item>
  </t-form>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue';
import { onMounted, ref, reactive } from 'vue';
/* eslint-disable no-template-curly-in-string */
const INITIAL_DATA = {
  account: '',
  description: '',
  password: '',
};
const validateMessage = {
  account: [
    {
      type: 'error',
      message: '自定义用户名校验信息提示',
    },
  ],
  description: [
    {
      type: 'warning',
      message: '自定义个人简介校验信息提示',
    },
  ],
};
const form = ref();
const formData = reactive({
  ...INITIAL_DATA,
});
const rules = reactive({
  account: [
    {
      required: true,
    },
    {
      min: 2,
    },
    {
      max: 10,
      type: 'warning',
    },
  ],
  description: [
    {
      validator: (val) => val.length < 10,
      message: '不能超过 20 个字，中文长度等于英文长度',
    },
  ],
  password: [
    {
      required: true,
    },
    {
      len: 8,
      message: '请输入 8 位密码',
    },
  ],
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
const handleValidateMessage = () => {
  MessagePlugin.success('设置表单校验信息提示成功');
  form.value.setValidateMessage(validateMessage);
};
onMounted(() => {
  form.value.setValidateMessage(validateMessage);
});
</script>

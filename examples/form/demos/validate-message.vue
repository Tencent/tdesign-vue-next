<template>
  <div>
    <!-- error-message 非必需 -->
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      scroll-to-first-error="smooth"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="用户名" help="这是用户名字段帮助说明" name="account">
        <t-input v-model="formData.account"></t-input>
      </t-form-item>
      <t-form-item label="个人简介" help="一句话介绍自己" name="description">
        <t-input v-model="formData.description"></t-input>
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input v-model="formData.password" type="password"></t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" style="margin-right: 10px">提交</t-button>
        <t-button theme="default" variant="base" type="reset" style="margin-right: 10px">重置</t-button>
        <t-button theme="default" variant="base" @click="handleValidateMessage">设置校验信息提示</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

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

const formData = ref({ ...INITIAL_DATA });
const rules = {
  account: [{ required: true }, { min: 2 }, { max: 10, type: 'warning' }],
  description: [{ validator: (val) => val.length < 10, message: '不能超过 20 个字，中文长度等于英文长度' }],
  password: [{ required: true }, { len: 8, message: '请输入 8 位密码' }],
};
const form = ref(null);
onMounted(() => {
  form.value.setValidateMessage(validateMessage);
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
</script>

<template>
  <t-space style="width: 350px">
    <t-form :data="formData" ref="form" @reset="onReset" @submit="onSubmit" :colon="true" :labelWidth="0">
      <t-form-item name="account">
        <t-input clearable v-model="formData.account" placeholder="请输入账户名">
          <desktop-icon slot="prefix-icon"></desktop-icon>
        </t-input>
      </t-form-item>
      <t-form-item name="password">
        <t-input type="password" clearable v-model="formData.password" placeholder="请输入密码">
          <lock-on-icon slot="prefix-icon"></lock-on-icon>
        </t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
  </t-space>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue';
import { reactive } from 'vue';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue';

const INITIAL_DATA = {
  account: '',
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

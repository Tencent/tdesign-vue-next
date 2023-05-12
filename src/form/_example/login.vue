<template>
  <div style="width: 350px">
    <t-form ref="form" :data="formData" :colon="true" :label-width="0" @reset="onReset" @submit="onSubmit">
      <t-form-item name="account">
        <t-input v-model="formData.account" clearable placeholder="请输入账户名">
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { Data, MessagePlugin, SubmitContext } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';

const formData = reactive({
  account: '',
  password: '',
});

const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = (context: SubmitContext<Data>) => {
  if (context.validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', context.validateResult);
    MessagePlugin.warning(context.firstError);
  }
};
</script>

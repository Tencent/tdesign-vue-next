<template>
  <div :style="{ width: '350px' }">
    <t-form status-icon :colon="true" :label-width="0" @submit="onSubmit" @reset="onReset">
      <t-form-item name="account">
        <t-input clearable :prefix-icon="DesktopIcon" placeholder="请输入账户名" />
      </t-form-item>
      <t-form-item name="password">
        <t-input type="password" :prefix-icon="LockOnIcon" clearable placeholder="请输入密码" />
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Form, MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const onSubmit: Parameters<typeof Form>[0]['onSubmit'] = (e) => {
      if (e.validateResult === true) {
        MessagePlugin.info('提交成功');
      }
    };

    const onReset: Parameters<typeof Form>[0]['onReset'] = (e) => {
      MessagePlugin.info('重置成功');
    };

    return {
      onSubmit,
      onReset,
      DesktopIcon,
      LockOnIcon,
    };
  },
});
</script>

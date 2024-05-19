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
<script>
import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue';

const INITIAL_DATA = {
  account: '',
  password: '',
};

export default {
  components: {
    DesktopIcon,
    LockOnIcon,
  },
  data() {
    return {
      formData: { ...INITIAL_DATA },
    };
  },

  methods: {
    onReset() {
      this.$message.success('重置成功');
    },
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.$message.success('提交成功');
      } else {
        console.log('Errors: ', validateResult);
        this.$message.warning(firstError);
      }
    },
  },
};
</script>

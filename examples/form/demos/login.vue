<template>
  <div style="width: 350px">
    <t-form
      :data="formData"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      :colon="true"
      labelWidth="0"
    >
      <t-form-item name='account'>
        <t-input type="account" clearable v-model="formData.account" placeholder="请输入账户名">
          <t-icon-desktop slot="prefix-icon"></t-icon-desktop>
        </t-input>
      </t-form-item>
      <t-form-item name='password'>
        <t-input type="password" clearablec v-model="formData.password" placeholder="请输入密码">
          <t-icon-lock-on slot="prefix-icon"></t-icon-lock-on>
        </t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" block >登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import TIconDesktop from '@tencent/tdesign-vue/lib/icon/desktop';
import TIconLockOn from '@tencent/tdesign-vue/lib/icon/lock-on';

const INITIAL_DATA = {
  account: '',
  password: '',
};

export default {
  components: {
    TIconDesktop,
    TIconLockOn,
  },
  data() {
    return {
      formData: { ...INITIAL_DATA },
    };
  },

  methods: {
    onReset() {
      this.formData = { ...INITIAL_DATA };
    },
    onSubmit() {
      this.$message.success('提交成功');
    },
  },
};
</script>

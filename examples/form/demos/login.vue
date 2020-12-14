<template>
  <div style="width: 350px">
    <t-form
      :data="formData"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      :colon="true"
    >
      <t-form-item name='account'>
        <t-input prefix-icon="desktop" v-model="formData.account" placeholder="请输入账户名"></t-input>
      </t-form-item>
      <t-form-item name='password'>
        <t-input prefix-icon="lock-on" type="password" v-model="formData.password" placeholder="请输入密码"></t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" block >登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>

const INITIAL_DATA = {
  account: '',
  password: '',
};

export default {
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

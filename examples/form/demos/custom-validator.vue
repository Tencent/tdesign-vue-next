<template>
  <div>
    <t-form
      :data="formData"
      :rules="rules"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="用户名"  name='account'>
        <t-input v-model="formData.account"></t-input>
      </t-form-item>
      <t-form-item label="密码" name='password'>
        <t-input v-model="formData.password"></t-input>
      </t-form-item>
      <t-form-item label="确认密码" name='rePassword'>
        <t-input v-model="formData.rePassword"></t-input>
      </t-form-item>
      <t-form-item>
        <t-button variant="base" theme="primary" type="submit" style="margin-right: 10px">提交</t-button>
        <t-button type="reset">重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>

const INITIAL_DATA = {
  account: '',
  password: '',
  rePassword: '',
};
export default {
  data() {
    return {
      formData: { ...INITIAL_DATA },
      rules: {
        account: [
          { required: true, message: '姓名必填', type: 'error' },
          { min: 2, message: '至少需要两个字', type: 'error' },
        ],
        password: [
          { required: true, message: '密码必填', type: 'error' },
        ],
        rePassword: [
          // 自定义校验规则
          { required: true, message: '密码必填', type: 'error' },
          { validator: this.rePassword, message: '两次密码不一致' },
        ],
      },
    };
  },

  methods: {
    onReset() {
      this.formData = { ...INITIAL_DATA };
    },
    onSubmit({ result, firstError, e }) {
      e.preventDefault();
      if (result === true) {
        this.$message.success('提交成功');
      } else {
        console.log('Errors: ', result);
        this.$message.warning(firstError);
      }
    },
    // 自定义异步校验器
    rePassword(val) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          resolve(this.formData.password === val);
          clearTimeout(timer);
        });
      });
    },
  },
};
</script>

<template>
  <div>
    <t-form
      :data="formData"
      :rules="rules"
      :labelWidth="100"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      @validate="onValidate"
    >
      <t-form-item label="用户名"  name='account'>
        <t-input v-model="formData.account" @blur="handleBlur()"></t-input>
      </t-form-item>
      <t-form-item label="密码" name='password'>
        <t-input type="password" v-model="formData.password"></t-input>
      </t-form-item>
      <t-form-item label="确认密码" name='rePassword'>
        <t-input type="password" v-model="formData.rePassword"></t-input>
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" style="margin-right: 10px">提交</t-button>
        <t-button  theme="default" variant="base" type="reset">重置</t-button>
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
          {
            min: 2, message: '至少需要两个字', type: 'error', trigger: 'blur',
          },
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
    onValidate({ validateResult, firstError }) {
      if (validateResult === true) {
        console.log('Validate Success');
      } else {
        console.log('Validate Errors: ', firstError, validateResult);
      }
    },
    handleBlur() {
      this.$refs.form.validate({
        fields: ['account'],
        trigger: 'blur',
      });
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

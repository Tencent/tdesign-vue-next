<template>
  <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit" @validate="onValidate">
    <t-form-item label="用户名" name="account">
      <t-input v-model="formData.account" placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="密码" name="password" help="同一个校验方法可输出不同的错误信息和类型，依次输入：1234 观察变化">
      <t-input type="password" v-model="formData.password" placeholder="请输入密码"></t-input>
    </t-form-item>
    <t-form-item label="确认密码" name="rePassword" help="自定义异步校验方法">
      <t-input type="password" v-model="formData.rePassword" placeholder="请再次输入密码"></t-input>
    </t-form-item>
    <t-form-item style="margin-left: 100px">
      <t-space size="10px">
        <t-button theme="primary" type="submit">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
      </t-space>
    </t-form-item>
  </t-form>
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
          { required: true, message: '用户名必填', type: 'error' },
          {
            validator: this.userNameValidator,
          },
        ],
        password: [
          { required: true, message: '密码必填', type: 'error' },
          // 自定义校验规则：不同的值可以有不同的校验结果，不同的校验类型
          { validator: this.passwordValidator },
        ],
        rePassword: [
          { required: true, message: '密码必填', type: 'error' },
          // 自定义校验规则：自定义异步校验规则
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
    // 自定义异步校验器，使用 resolve 返回结果控制校验结果、校验信息、校验结果类型
    userNameValidator(val) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          if (['Zhang', 'Li', 'Wang'].includes(val)) {
            resolve({ result: true });
          } else {
            resolve({ result: false, message: '用户名不存在', type: 'error' });
          }
          clearTimeout(timer);
        }, 10);
      });
    },
    // 自定义校验器，不同的值输出不同的校验结果。支持异步校验（文案选自某密码重置站点，如有侵权，请联系我们删除）
    passwordValidator(val) {
      if (val.length > 0 && val.length <= 2) {
        return { result: false, message: '太简单了！再开动一下你的小脑筋吧！', type: 'error' };
      }
      if (val.length > 2 && val.length < 4) {
        return { result: false, message: '还差一点点，就是一个完美的密码了！', type: 'warning' };
      }
      return { result: true, message: '太强了，你确定自己记得住吗！', type: 'success' };
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

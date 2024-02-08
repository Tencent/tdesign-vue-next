<template>
  <t-form ref="form" :data="formData" :rules="rules" @reset="onReset" @submit="onSubmit" @validate="onValidate">
    <t-form-item label="用户名" name="account">
      <t-input v-model="formData.account"></t-input>
    </t-form-item>

    <t-form-item label="密码" name="password" help="同一个校验方法可输出不同的错误信息和类型，依次输入：1234 观察变化">
      <t-input v-model="formData.password" type="password"></t-input>
    </t-form-item>

    <t-form-item label="确认密码" name="rePassword" help="自定义异步校验方法">
      <t-input v-model="formData.rePassword" type="password"></t-input>
    </t-form-item>

    <t-form-item>
      <t-space size="small">
        <t-button theme="primary" type="submit">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
      </t-space>
    </t-form-item>
  </t-form>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MessagePlugin, FormInstanceFunctions, FormProps, CustomValidator } from 'tdesign-vue-next';
const form = ref<FormInstanceFunctions>(null);
const formData: FormProps['data'] = reactive({
  account: '',
  password: '',
  rePassword: '',
});
const onReset: FormProps['onReset'] = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit: FormProps['onSubmit'] = ({ validateResult, firstError, e }) => {
  e.preventDefault();
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};
const onValidate: FormProps['onValidate'] = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    console.log('Validate Success');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
  }
};
const rePassword: CustomValidator = (val) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(formData.password === val);
      clearTimeout(timer);
    });
  });
const passwordValidator: CustomValidator = (val) => {
  if (val.length > 0 && val.length <= 2) {
    return {
      result: false,
      message: '太简单了！再开动一下你的小脑筋吧！',
      type: 'error',
    };
  }
  if (val.length > 2 && val.length < 4) {
    return {
      result: false,
      message: '还差一点点，就是一个完美的密码了！',
      type: 'warning',
    };
  }
  return {
    result: true,
    message: '太强了，你确定自己记得住吗！',
    type: 'success',
  };
};
const rules: FormProps['rules'] = {
  account: [
    {
      required: true,
      message: '姓名必填',
      type: 'error',
    },
    {
      min: 2,
      message: '至少需要两个字',
      type: 'error',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码必填',
      type: 'error',
    },
    {
      validator: passwordValidator,
    },
  ],
  rePassword: [
    // 自定义校验规则
    {
      required: true,
      message: '密码必填',
      type: 'error',
    },
    {
      validator: rePassword,
      message: '两次密码不一致',
    },
  ],
};
</script>

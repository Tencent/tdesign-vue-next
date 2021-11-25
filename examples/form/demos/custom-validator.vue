<template>
  <div>
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      :label-width="100"
      @reset="onReset"
      @submit="onSubmit"
      @validate="onValidate"
    >
      <t-form-item label="用户名" name="account">
        <t-input v-model="formData.account" @blur="handleBlur()" />
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input v-model="formData.password" type="password" />
      </t-form-item>
      <t-form-item label="确认密码" name="rePassword">
        <t-input v-model="formData.rePassword" type="password" />
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" style="margin-right: 10px"> 提交 </t-button>
        <t-button theme="default" variant="base" type="reset"> 重置 </t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

const INITIAL_DATA = {
  account: '',
  password: '',
  rePassword: '',
};

export default defineComponent({
  setup() {
    const formData = ref({ ...INITIAL_DATA });
    const form = ref(null);

    const onReset = () => {
      MessagePlugin.success('重置成功');
    };

    const onSubmit = ({ validateResult, firstError, e }) => {
      e.preventDefault();
      if (validateResult === true) {
        MessagePlugin.success('提交成功');
      } else {
        console.log('Validate Errors: ', firstError, validateResult);
        MessagePlugin.warning(firstError);
      }
    };

    const onValidate = ({ validateResult, firstError }) => {
      if (validateResult === true) {
        console.log('Validate Success');
      } else {
        console.log('Validate Errors: ', firstError, validateResult);
      }
    };

    const handleBlur = () => {
      form.value.validate({
        fields: ['account'],
        trigger: 'blur',
      });
    };

    const rePassword = (val) =>
      new Promise((resolve) => {
        const timer = setTimeout(() => {
          resolve(formData.value.password === val);
          clearTimeout(timer);
        });
      });

    const rules = {
      account: [
        { required: true, message: '姓名必填', type: 'error' },
        {
          min: 2,
          message: '至少需要两个字',
          type: 'error',
          trigger: 'blur',
        },
      ],
      password: [{ required: true, message: '密码必填', type: 'error' }],
      rePassword: [
        // 自定义校验规则
        { required: true, message: '密码必填', type: 'error' },
        { validator: rePassword, message: '两次密码不一致' },
      ],
    };

    return {
      form,
      formData,
      rules,
      onReset,
      onSubmit,
      onValidate,
      handleBlur,
    };
  },
});
</script>

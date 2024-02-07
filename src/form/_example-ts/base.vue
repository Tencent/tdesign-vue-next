<template>
  <t-form ref="form" :rules="FORM_RULES" :data="formData" :colon="true" @reset="onReset" @submit="onSubmit">
    <t-form-item label="姓名" name="name">
      <t-input v-model="formData.name" placeholder="请输入内容" @enter="onEnter"></t-input>
    </t-form-item>

    <t-form-item label="手机号码" name="tel">
      <t-input v-model="formData.tel" placeholder="请输入内容" @enter="onEnter"></t-input>
    </t-form-item>

    <t-form-item label="接收短信" name="status">
      <t-switch v-model="formData.status"></t-switch>
    </t-form-item>

    <t-form-item label="性别" name="gender">
      <t-radio-group v-model="formData.gender">
        <t-radio value="1">男</t-radio>
        <t-radio value="2">女</t-radio>
      </t-radio-group>
    </t-form-item>

    <t-form-item label="课程" name="course">
      <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
    </t-form-item>

    <t-form-item>
      <t-space size="small">
        <t-button theme="primary" type="submit">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
        <!-- 下方示例代码，有效，勿删 -->
        <!--<t-button theme="default" @click="submitForm">实例方法提交</t-button>-->
        <!--<t-button theme="default" variant="base" @click="resetForm">实例方法重置</t-button>-->
        <!--<t-button theme="default" variant="base" @click="validateOnly">仅校验</t-button>-->
      </t-space>
    </t-form-item>
  </t-form>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MessagePlugin, FormProps, FormInstanceFunctions, CheckboxGroupProps, InputProps } from 'tdesign-vue-next';
const FORM_RULES: FormProps['rules'] = {
  name: [
    {
      required: true,
      message: '姓名必填',
    },
  ],
};
const formData: FormProps['data'] = reactive({
  name: '',
  tel: '',
  gender: '',
  course: [],
  status: false,
});
const form = ref<FormInstanceFunctions>(null);
const courseOptions: CheckboxGroupProps['options'] = [
  {
    label: '语文',
    value: '1',
  },
  {
    label: '数学',
    value: '2',
  },
  {
    label: '英语',
    value: '3',
  },
];
const onReset: FormProps['onReset'] = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit: FormProps['onSubmit'] = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const submitForm = async () => {
  form.value.submit();
  form.value.submit({
    showErrorMessage: false,
  });

  // 校验数据，代码有效，勿删
  // form.value.validate();

  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  // form.value.validate({ showErrorMessage: false }).then((validateResult) => {
  //   if (validateResult && Object.keys(validateResult).length) {
  //     const firstError = Object.values(validateResult)[0]?.[0]?.message;
  //     MessagePlugin.warning(firstError);
  //   }
  // });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetForm = () => {
  form.value.reset();
  // 下方为示例代码，有效，勿删
  // form.value.reset({ type: 'initial' });
  // form.value.reset({ type: 'empty' });
  // form.value.reset({ type: 'initial', fields: ['name'] });
  // form.value.reset({ type: 'empty', fields: ['name'] });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validateOnly = async () => {
  const result = await form.value.validateOnly();
  MessagePlugin.success('打开控制台查看校验结果');
  console.log('validateOnly', result);
};

// 禁用 Input 组件，按下 Enter 键时，触发 submit 事件
const onEnter: InputProps['onEnter'] = (_, { e }) => {
  e.preventDefault();
};
</script>

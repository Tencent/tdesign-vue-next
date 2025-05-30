<template>
  <!--  scrollToFirstError="smooth" -->
  <t-form ref="form" :data="formData" :rules="rules" @reset="onReset" @submit="onSubmit">
    <t-form-item label="用户名" help="这是用户名字段帮助说明" name="account">
      <t-input v-model="formData.account"></t-input>
    </t-form-item>

    <t-form-item label="个人简介" help="一句话介绍自己" name="description">
      <t-input v-model="formData.description"></t-input>
    </t-form-item>

    <t-form-item label="密码" name="password">
      <t-input v-model="formData.password" type="password"></t-input>
    </t-form-item>

    <t-form-item label="邮箱" name="email">
      <t-auto-complete v-model="formData.email" :options="emailOptions" filterable></t-auto-complete>
    </t-form-item>

    <t-form-item label="年龄" name="age">
      <t-input-number v-model="formData.age" />
    </t-form-item>

    <t-form-item label="性别" name="gender">
      <t-radio-group v-model="formData.gender">
        <t-radio value="male">男</t-radio>
        <t-radio value="femal">女</t-radio>
      </t-radio-group>
    </t-form-item>

    <t-form-item label="课程" name="course">
      <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
    </t-form-item>

    <t-form-item label="学院" name="college">
      <t-select v-model="formData.college" class="demo-select-base" clearable filterable>
        <t-option v-for="(item, index) in options" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>

    <t-form-item
      label="入学时间"
      name="date"
      :rules="[
        { required: true, message: '此项必填' },
        { date: { delimiters: ['/', '-', '.'] }, message: '日期格式有误' },
      ]"
    >
      <t-input v-model="formData.date"></t-input>
    </t-form-item>

    <t-form-item label="个人网站" name="content.url">
      <t-input v-model="formData.content.url"></t-input>
    </t-form-item>

    <t-form-item>
      <t-space size="small">
        <t-button theme="primary" type="submit">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
        <t-button theme="default" variant="base" @click="handleClear">清空校验结果</t-button>
      </t-space>
    </t-form-item>
  </t-form>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import {
  MessagePlugin,
  FormInstanceFunctions,
  FormProps,
  CheckboxGroupProps,
  AutoCompleteProps,
  ButtonProps,
} from 'tdesign-vue-next';
const form = ref<FormInstanceFunctions>(null);
const formData: FormProps['data'] = reactive({
  account: '',
  password: '',
  email: '',
  age: undefined,
  gender: '',
  course: [],
  college: '',
  date: '',
  content: {
    url: '',
  },
});
const rules: FormProps['rules'] = {
  account: [
    {
      required: true,
      message: '姓名必填',
      type: 'error',
      trigger: 'blur',
    },
    {
      required: true,
      message: '姓名必填',
      type: 'error',
      trigger: 'change',
    },
    {
      whitespace: true,
      message: '姓名不能为空',
    },
    {
      min: 3,
      message: '输入字数应在3到6之间',
      type: 'error',
      trigger: 'blur',
    },
    {
      max: 6,
      message: '输入字数应在3到6之间',
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
  ],
  email: [
    {
      required: true,
      message: '邮箱必填',
      type: 'error',
    },
    {
      email: { ignore_max_length: true },
      message: '格式必须为邮箱',
      type: 'error',
    },
  ],
  age: [
    {
      required: true,
      message: '年龄必填',
      type: 'error',
    },
    {
      number: true,
      message: '请输入数字',
      type: 'warning',
    },
  ],
  gender: [
    {
      required: true,
      message: '性别必填',
      type: 'warning',
    },
  ],
  course: [
    {
      required: true,
      message: '课程必填',
      type: 'warning',
    },
  ],
  college: [
    // 注意：trigger: blur 仅在输入框或选择框失去焦点时触发，需要注意配合 trigger: change 使用
    {
      required: true,
      message: '学院必选',
      type: 'warning',
      trigger: 'blur',
    },
    {
      required: true,
      message: '学院必选',
      type: 'warning',
      trigger: 'change',
    },
  ],
  'content.url': [
    {
      required: true,
      message: '个人网站必填',
      type: 'warning',
    },
    {
      url: {
        protocols: ['http', 'https', 'ftp'],
        require_protocol: true,
      },
      message: '请输入正确的个人主页',
    },
  ],
};
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
  {
    label: '体育',
    value: '4',
  },
];
const emailSuffix = ['@qq.com', '@163.com', '@gmail.com'];
const emailOptions = computed<AutoCompleteProps['options']>(() => {
  const emailPrefix = formData.email.split('@')[0];
  if (!emailPrefix) return [];
  return emailSuffix.map((suffix) => emailPrefix + suffix);
});
const options = [
  {
    label: '计算机学院',
    value: '1',
  },
  {
    label: '软件学院',
    value: '2',
  },
  {
    label: '物联网学院',
    value: '3',
  },
];
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
const handleClear: ButtonProps['onClick'] = () => {
  form.value.clearValidate();
};
</script>
<style scoped>
.demo-select-base {
  width: 300px;
}
</style>

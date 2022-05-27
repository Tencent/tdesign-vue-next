<template>
  <div>
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
        <t-input v-model="formData.email"></t-input>
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
        <t-select v-model="formData.college" class="demo-select-base" clearable>
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
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" style="margin-right: 10px">提交</t-button>
        <t-button theme="default" variant="base" type="reset" style="margin-right: 10px">重置</t-button>
        <t-button theme="default" variant="base" @click="handleClear">清空校验结果</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const rules = {
  account: [
    { required: true, message: '姓名必填', type: 'error', trigger: 'blur' },
    { required: true, message: '姓名必填', type: 'error', trigger: 'change' },
    { min: 3, message: '输入字数应在3到6之间', type: 'error', trigger: 'blur' },
    { max: 6, message: '输入字数应在3到6之间', type: 'error', trigger: 'blur' },
  ],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  email: [{ required: true, message: '格式必须为邮箱', type: 'warning' }],
  age: [
    { required: true, message: '年龄必填', type: 'error' },
    { number: true, message: '请输入数字', type: 'warning' },
  ],
  gender: [{ required: true, message: '性别必填', type: 'warning' }],
  course: [{ required: true, message: '课程必填', type: 'warning' }],
  college: [{ required: true, message: '学院必选', type: 'warning', trigger: 'blur' }],
  'content.url': [
    { required: true, message: '个人网站必填', type: 'warning' },
    {
      url: {
        protocols: ['http', 'https', 'ftp'],
        require_protocol: true,
      },
      message: '请输入正确的个人主页',
    },
  ],
};

const INITIAL_DATA = {
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
};

const courseOptions = [
  { label: '语文', value: '1' },
  { label: '数学', value: '2' },
  { label: '英语', value: '3' },
  { label: '体育', value: '4' },
];

const options = [
  { label: '计算机学院', value: '1' },
  { label: '软件学院', value: '2' },
  { label: '物联网学院', value: '3' },
];

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

const handleClear = () => {
  form.value.clearValidate();
};
</script>
<style scoped>
.demo-select-base {
  width: 300px;
}
</style>

<template>
  <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit" scrollToFirstError="smooth">
    <t-form-item label="用户名" help="这里可以展示一段说明文字" name="account">
      <t-input v-model="formData.account" placeholder="请输入用户名"></t-input>
    </t-form-item>
    <t-form-item label="个人简介" help="请用一句话介绍自己" name="description">
      <t-input v-model="formData.description" placeholder="请输入个人简介"></t-input>
    </t-form-item>
    <t-form-item label="密码" name="password">
      <t-input type="password" v-model="formData.password" placeholder="请输入密码"></t-input>
    </t-form-item>
    <t-form-item label="邮箱" name="email">
      <t-input v-model="formData.email" placeholder="请输入邮箱"></t-input>
    </t-form-item>
    <t-form-item label="性别" name="gender">
      <t-radio-group v-model="formData.gender">
        <t-radio value="male">男</t-radio>
        <t-radio value="female">女</t-radio>
      </t-radio-group>
    </t-form-item>
    <t-form-item label="课程" name="course">
      <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
    </t-form-item>
    <t-form-item label="学院" name="college">
      <t-select v-model="formData.college" class="demo-select-base" clearable placeholder="请选择所在院校">
        <t-option v-for="(item, index) in options" :value="item.value" :label="item.label" :key="index">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>
    <t-form-item
      label="入学时间"
      name="date"
      :rules="[{ date: { delimiters: ['/', '-', '.'] }, message: '日期格式有误' }]"
    >
      <t-input v-model="formData.date" placeholder="请输入入学时间"></t-input>
    </t-form-item>
    <t-form-item label="个人网站" name="content.url">
      <t-input v-model="formData.content.url" placeholder="请输入个人网站地址"></t-input>
    </t-form-item>
    <t-form-item style="margin-left: 100px">
      <t-space size="10px">
        <t-button theme="primary" type="submit"> 提交 </t-button>
        <t-button theme="default" variant="base" type="reset"> 重置 </t-button>
        <t-button theme="default" variant="base" @click="handleClear"> 清空校验结果 </t-button>
        <t-button theme="default" variant="base" @click="clearFieldsValidateResult"> 清除指定字段的校验结果 </t-button>
      </t-space>
    </t-form-item>
  </t-form>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue';
import { ref, reactive } from 'vue';

const INITIAL_DATA = {
  account: '',
  password: '',
  description: '',
  email: '',
  gender: '',
  college: '',
  date: '',
  content: {
    url: '',
  },
  course: [],
};
const form = ref();
const formData = reactive({
  ...INITIAL_DATA,
});
const courseOptions = ref([
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
]);
const options = ref([
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
]);
const rules = reactive({
  account: [
    {
      required: true,
      message: '姓名必填',
    },
    {
      min: 2,
      message: '至少需要两个字符，一个中文等于两个字符',
    },
    {
      max: 10,
      message: '姓名字符长度超出',
    },
  ],
  description: [
    {
      validator: (val) => val.length >= 5,
      message: '至少 5 个字，中文长度等于英文长度',
    },
    {
      validator: (val) => val.length < 20,
      message: '不能超过 20 个字，中文长度等于英文长度',
    },
  ],
  password: [
    {
      required: true,
      message: '密码必填',
    },
    {
      len: 8,
      message: '请输入 8 位密码',
    },
    {
      pattern: /[A-Z]+/,
      message: '密码必须包含大写字母',
    },
  ],
  email: [
    {
      required: true,
      message: '邮箱必填',
    },
    {
      email: {
        ignore_max_length: true,
      },
      message: '请输入正确的邮箱地址',
    },
  ],
  gender: [
    {
      required: true,
      message: '性别必填',
    },
  ],
  course: [
    {
      required: true,
      message: '课程必填',
    },
    {
      validator: (val) => val.length <= 2,
      message: '最多选择 2 门课程',
    },
  ],
  'content.url': [
    {
      required: true,
      message: '个人网站必填',
    },
    {
      url: {
        protocols: ['http', 'https', 'ftp'],
        require_protocol: true,
      },
      message: '请输入正确的个人主页',
    },
  ],
});
const onReset = () => {
  MessagePlugin.success('重置成功');
  console.log('formData', formData);
};
const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.warning(firstError);
  }
};
const handleClear = () => {
  form.value.clearValidate();
};
// 清除指定字段的校验结果
const clearFieldsValidateResult = () => {
  form.value.clearValidate(['email', 'course', 'content.url']);
  MessagePlugin.success('已清除邮箱、课程、个人网站等字段校验结果');
};
</script>

<style scoped>
.demo-select-base {
  width: 300px;
}
</style>

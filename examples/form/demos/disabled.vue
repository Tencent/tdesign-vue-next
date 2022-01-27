<template>
  <div>
    <div style="margin-left: 36px">
      <t-checkbox v-model="formDisabled" variant="default-filled"> 是否禁用表单 </t-checkbox>
    </div>
    <br /><br />
    <t-form
      ref="form"
      :data="formData"
      reset-type="initial"
      :disabled="formDisabled"
      colon
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="姓名" name="name">
        <t-input v-model="formData.name"></t-input>
      </t-form-item>
      <t-form-item label="学院" name="college">
        <t-select v-model="formData.college" :options="COLLEGE_OPTIONS" clearable></t-select>
      </t-form-item>
      <t-form-item label="寄件地址" name="address1">
        <t-tree-select v-model="formData.address1" :data="ADDRESS_OPTIONS" clearable />
      </t-form-item>
      <t-form-item label="收件地址" name="address2">
        <t-cascader v-model="formData.address2" :options="ADDRESS_OPTIONS" clearable />
      </t-form-item>
      <t-form-item label="日期" name="date">
        <t-date-picker v-model="formData.date" mode="date" clearable />
      </t-form-item>
      <t-form-item label="个人简介" name="personalProfile">
        <t-textarea v-model="formData.personalProfile" placeholder="简单描述自己的经历" clearable />
      </t-form-item>
      <t-form-item label="短信" name="message">
        <t-switch v-model="formData.message" :label="['接受', '不接']"></t-switch>
      </t-form-item>
      <t-form-item label="性别" name="gender">
        <t-radio-group v-model="formData.gender">
          <t-radio value="1">男</t-radio>
          <t-radio value="2">女</t-radio>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="课程" name="course">
        <t-checkbox-group v-model="formData.course" :options="courseOptions" />
      </t-form-item>
      <t-form-item label="绩点" name="gradePoint">
        <t-input-number v-model="formData.gradePoint" theme="normal" placeholder="数字" />
      </t-form-item>
      <t-form-item label="头像" name="avatar">
        <t-upload
          v-model="formData.avatar"
          action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
          theme="image"
          tips="请选择单张图片文件上传"
          accept="image/*"
        ></t-upload>
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" style="margin-right: 10px">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const INITIAL_DATA = {
  name: '',
  tel: '',
  gender: '',
  course: [],
  status: false,
};
const formData = ref({ ...INITIAL_DATA });
const courseOptions = [
  { label: '语文', value: '1' },
  { label: '数学', value: '2' },
  { label: '英语', value: '3' },
];

const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.warning(firstError);
  }
};
</script>

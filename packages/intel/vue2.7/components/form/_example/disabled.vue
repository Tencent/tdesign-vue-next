<template>
  <t-space direction="vertical" size="32px">
    <t-space style="margin-left: 36px">
      <t-checkbox v-model="formDisabled" variant="default-filled"> 是否禁用表单 </t-checkbox>
    </t-space>

    <t-form
      :data="formData"
      ref="form"
      resetType="initial"
      :disabled="formDisabled"
      colon
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="姓名" name="name">
        <t-input v-model="formData.name" @enter="onEnter" placeholder="请输入姓名"></t-input>
      </t-form-item>
      <t-form-item label="学院" name="college">
        <t-select
          v-model="formData.college"
          :options="COLLEGE_OPTIONS"
          clearable
          placeholder="请选择所在学院"
        ></t-select>
      </t-form-item>
      <t-form-item label="寄件地址" name="address1">
        <t-tree-select v-model="formData.address1" :data="ADDRESS_OPTIONS" clearable placeholder="请选择寄件地址" />
      </t-form-item>
      <t-form-item label="收件地址" name="address2">
        <t-cascader v-model="formData.address2" :options="ADDRESS_OPTIONS" clearable placeholder="请选择收件地址" />
      </t-form-item>
      <t-form-item label="日期" name="date">
        <t-date-picker v-model="formData.date" mode="date" clearable placeholder="请选择日期" />
      </t-form-item>
      <t-form-item label="个人简介" name="personalProfile">
        <t-textarea v-model="formData.personalProfile" placeholder="请用一句话介绍自己" clearable />
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
        <t-input-number v-model="formData.gradePoint" placeholder="分数值" />
      </t-form-item>
      <t-form-item label="头像" name="avatar">
        <t-upload
          action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
          v-model="formData.avatar"
          theme="image"
          tips="请选择单张图片文件上传"
          accept="image/*"
        ></t-upload>
      </t-form-item>
      <t-form-item style="margin-left: 100px">
        <t-space size="10px">
          <t-button theme="primary" type="submit">提交</t-button>
          <t-button theme="default" variant="base" type="reset">重置</t-button>
        </t-space>
      </t-form-item>
    </t-form>
  </t-space>
</template>
<script>
const INITIAL_DATA = {
  name: '',
  message: true,
  gender: '',
  course: [],
  college: '',
  personalProfile: '',
  address1: undefined,
  address2: undefined,
  gradePoint: undefined,
  date: '',
  avatar: [{ url: 'https://tdesign.gtimg.com/site/avatar.jpg' }],
};

const COLLEGE_OPTIONS = [
  { label: '学院 A', value: 1 },
  { label: '学院 B', value: 2 },
  { label: '学院 C', value: 3 },
];

const ADDRESS_OPTIONS = [
  { label: '江苏', value: 1, children: [{ label: '南京市', value: 300 }] },
  { label: '上海', value: 2, children: [{ label: '徐汇区', value: 400 }] },
  { label: '四川', value: 3, children: [{ label: '成都市', value: 500 }] },
];

export default {
  data() {
    return {
      formDisabled: true,
      formData: { ...INITIAL_DATA },
      COLLEGE_OPTIONS,
      ADDRESS_OPTIONS,
      courseOptions: [
        { label: '语文', value: '1' },
        { label: '数学', value: '2' },
        { label: '英语', value: '3' },
      ],
    };
  },

  methods: {
    // 重置方法：this.$refs.reset()
    onReset() {
      this.$message.success('重置成功');
    },
    // 提交方法：this.$refs.submit()
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.$message.success('提交成功');
      } else {
        console.log('Errors: ', validateResult);
        this.$message.warning(firstError);
      }
    },
    // 阻止表单默认提交事件
    onEnter(_, ctx) {
      if (ctx && ctx.e) {
        ctx.e.preventDefault();
      }
    },
  },
};
</script>

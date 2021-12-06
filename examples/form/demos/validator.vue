<template>
  <div>
    <t-form
      ref="form"
      :data="formData"
      :rules="rules"
      :label-width="100"
      scroll-to-first-error="smooth"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="用户名" help="这里请填写用户名" name="account">
        <t-input v-model="formData.account" />
      </t-form-item>
      <t-form-item label="密码" help="这里请填写密码" name="password">
        <t-input v-model="formData.password" />
      </t-form-item>
      <t-form-item label="邮箱" name="email">
        <t-input v-model="formData.email" />
      </t-form-item>
      <t-form-item label="性别" name="gender">
        <t-radio-group v-model="formData.gender">
          <t-radio value="male"> 男 </t-radio>
          <t-radio value="femal"> 女 </t-radio>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="课程" name="course">
        <t-checkbox-group v-model="formData.course" :options="courseOptions" />
      </t-form-item>
      <t-form-item label="学院" name="college">
        <t-select v-model="formData.college" class="demo-select-base" clearable>
          <t-option v-for="(item, index) in collegeOptions" :key="index" :value="item.value" :label="item.label">
            {{ item.label }}
          </t-option>
        </t-select>
      </t-form-item>
      <t-form-item
        label="入学时间"
        name="date"
        :rules="[{ date: { delimiters: ['/', '-', '.'] }, message: '日期格式有误' }]"
      >
        <t-input v-model="formData.date" />
      </t-form-item>
      <t-form-item label="个人网站" name="content.url">
        <t-input v-model="formData.content.url" />
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" style="margin-right: 10px"> 提交 </t-button>
        <t-button theme="default" variant="base" type="reset" style="margin-right: 10px"> 重置 </t-button>
        <t-button theme="default" variant="base" @click="handleClear"> 清除校验结果 </t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const rules = {
  account: [
    { required: true, message: '姓名必填', type: 'error' },
    { min: 2, message: '至少需要两个字', type: 'error' },
  ],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  email: [{ required: true, message: '格式必须为邮箱', type: 'warning' }],
  gender: [{ required: true, message: '性别必填', type: 'warning' }],
  course: [{ required: true, message: '课程必填', type: 'warning' }],
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
  gender: '',
  date: '',
  content: {
    url: '',
  },
  course: [],
};

const courseOptions = [
  { label: '语文', value: '1' },
  { label: '数学', value: '2' },
  { label: '英语', value: '3' },
  { label: '体育', value: '4' },
];

const collegeOptions = [
  { label: '计算机学院', value: '1' },
  { label: '软件学院', value: '2' },
  { label: '物联网学院', value: '3' },
];

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

    const handleClear = () => {
      form.value.clearValidate();
    };

    return {
      form,
      rules,
      formData,
      courseOptions,
      collegeOptions,
      onReset,
      onSubmit,
      handleClear,
    };
  },
});
</script>

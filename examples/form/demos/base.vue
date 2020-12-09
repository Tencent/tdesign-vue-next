<template>
  <div>
    <p>校验规则可以定义在 label</p>
    <t-form :data="formData" :rules="rules" ref="form" @reset="onReset" @submit="onSubmit" scrollToFirstError="smooth">
      <t-form-item label="姓名" name='name'>
        <t-input v-model="formData.name"></t-input>
      </t-form-item>
      <t-form-item label="邮箱" name='email' :rules="[{ email: true, message: '格式必须为邮箱', type: 'error' }]">
        <t-input v-model="formData.email"></t-input>
      </t-form-item>
      <t-form-item label="性别" name='gender'>
        <t-radio-group v-model="formData.gender" buttonStyle="solid">
          <t-radio-button value="male">男</t-radio-button>
          <t-radio-button value="femal">女</t-radio-button>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="课程" name='course'>
        <t-checkbox-group
          name="city"
          v-model="formData.course"
          :options="courseOptions"
        ></t-checkbox-group>
      </t-form-item>
      <t-form-item label="是否通知老师" name='isPostMessage'>
        <t-switch v-model="formData.isPostMessage"></t-switch>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit">提交</t-button>
        <t-button type="reset">重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
const INITIAL_DATA = {
  name: '',
  email: '',
  gender: '',
  course: [],
  isPostMessage: false,
};
export default {
  data() {
    return {
      formData: { ...INITIAL_DATA },
      courseOptions: [
        { label: '语文', value: '1' },
        { label: '数学', value: '2' },
        { label: '英语', value: '3' },
        { label: '体育', value: '4' },
      ],
      rules: {
        name: [
          { required: true, message: '姓名必填', type: 'warning' },
        ],
        // email: [
        //   { email: true, message: '格式必须为邮箱', type: 'error' },
        // ],
        gender: [
          { required: true, message: '性别必填' },
        ],
        course: [
          { required: true, message: '课程必填' },
        ],
      },
    };
  },

  methods: {
    onReset() {
      this.formData = { ...INITIAL_DATA };
    },
    onSubmit({ result, firstError, e }) {
      e.preventDefault();
      if (result === true) {
        this.$message.success('提交成功');
      } else {
        console.log('Errors: ', result);
        this.$message.warning(firstError.message);
      }
    },
  },
};
</script>

<template>
  <div>
    <t-form
      :data="formData"
      :rules="rules"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      scrollToFirstError="smooth"
    >
      <t-form-item label="输入框" name='name'>
        <t-input v-model="formData.name"></t-input>
      </t-form-item>
      <t-form-item label="输入框" name='idcard'>
        <t-input v-model="formData.idcard"></t-input>
      </t-form-item>
      <t-form-item label="单选框" name='gender'>
        <t-radio-group v-model="formData.gender" buttonStyle="solid">
          <t-radio-button value="male">男</t-radio-button>
          <t-radio-button value="femal">女</t-radio-button>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="多选框" name='course'>
        <t-checkbox-group
          name="city"
          v-model="formData.course"
          :options="courseOptions"
        ></t-checkbox-group>
      </t-form-item>
      <t-form-item label="开关" name='isPostMessage'>
        <t-switch v-model="formData.isPostMessage"></t-switch>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit">提交</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
const INITIAL_DATA = {
  name: '',
  idcard: '',
  email: '',
  gender: '',
  date: '',
  url: '',
  teacher: '',
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
          { min: 2, message: '至少需要两个字', type: 'warning' },
        ],
        idcard: [
          { idcard: true, message: '身份证号码有误', type: 'error' },
        ],
        email: [
          { email: true, message: '格式必须为邮箱', type: 'error' },
        ],
        gender: [
          { required: true, message: '性别必填' },
        ],
        course: [
          { required: true, message: '课程必填' },
        ],
        url: [
          {
            url: {
              protocols: ['http', 'https', 'ftp'],
              // eslint-disable-next-line @typescript-eslint/camelcase
              require_protocol: true,
            },
            message: '请输入正确的个人主页',
          },
        ],
        teacher: [
          // 自定义校验规则
          { validator: this.teacherValidator, message: '老师可选项：张老师，王老师，李老师' },
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
        this.$message.warning(firstError);
      }
    },
    // 自定义异步校验器
    teacherValidator(val) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          resolve(['张老师', '李老师', '王老师'].includes(val));
          clearTimeout(timer);
        });
      });
    },
  },
};
</script>

<template>
  <div>
    <t-form :data="formData" :rules="rules">
      <t-form-item label="姓名" name='name'>
        <t-input v-model="formData.name"></t-input>
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
export default {
  data() {
    return {
      formData: {
        name: '',
        gender: '',
        course: [],
        isPostMessage: false,
      },
      courseOptions: [
        { label: '语文', value: '1' },
        { label: '数学', value: '2' },
        { label: '英语', value: '3' },
        { label: '体育', value: '4' },
      ],
      rules: {
        name: [
          { required: true, message: '姓名必填' },
          { email: true, message: '格式必须为邮箱' },
        ],
        gender: [
          { required: true, message: '性别必填' },
        ],
        course: [
          { required: true, message: '课程必填' },
        ],
      },
    };
  },
};
</script>

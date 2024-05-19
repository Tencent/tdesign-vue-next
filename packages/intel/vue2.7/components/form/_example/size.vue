<template>
  <t-space direction="vertical" size="32px">
    <t-radio-group v-model="size" variant="default-filled">
      <t-radio-button value="medium">中尺寸（默认）</t-radio-button>
      <t-radio-button value="large">大尺寸</t-radio-button>
    </t-radio-group>

    <!-- 开发中 -->
    <t-form :data="formData" :size="size" @reset="onReset" @submit="onSubmit">
      <t-form-item label="姓名" name="name">
        <t-input v-model="formData.name" placeholder="请输入姓名"></t-input>
      </t-form-item>
      <t-form-item label="手机号码" name="tel">
        <t-input v-model="formData.tel" placeholder="请输入手机号码"></t-input>
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
  tel: '',
  gender: '',
  course: [],
  status: false,
};

export default {
  data() {
    return {
      size: 'medium',
      formData: { ...INITIAL_DATA },
      courseOptions: [
        { label: '语文', value: '1' },
        { label: '数学', value: '2' },
        { label: '英语', value: '3' },
      ],
    };
  },

  methods: {
    onReset() {
      this.$message.success('重置成功');
    },
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.$message.success('提交成功');
      } else {
        console.log('Errors: ', validateResult);
        this.$message.warning(firstError);
      }
    },
  },
};
</script>

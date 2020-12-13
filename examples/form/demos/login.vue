<template>
  <div style="width: 350px">
    <t-form
      :data="formData"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      :colon="true"
    >
      <t-form-item name='account'>
        <t-input prefix-icon="desktop" v-model="formData.account" placeholder="请输入账户名"></t-input>
      </t-form-item>
      <t-form-item name='password'>
        <t-input prefix-icon="lock-on" type="password" v-model="formData.password" placeholder="请输入密码"></t-input>
      </t-form-item>
      <t-form-item name='checked'>
        <t-checkbox v-model="formData.checked">记住</t-checkbox>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" block >登陆</t-button>
      </t-form-item>
    </t-form>
  </div>
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
      this.formData = { ...INITIAL_DATA };
    },
    onSubmit() {
      this.$message.success('提交成功');
    },
  },
};
</script>

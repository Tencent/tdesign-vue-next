<template>
  <div>
    <t-form
      :data="formData"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      scrollToFirstError="smooth"
      :labelAlign="formData.labelAlign"
    >
      <t-form-item label="对齐方式" name='labelAlign'>
        <t-radio-group v-model="formData.labelAlign" buttonStyle="solid">
          <t-radio-button value="left">左对齐</t-radio-button>
          <t-radio-button value="right">右对齐</t-radio-button>
          <t-radio-button value="top">顶部对齐</t-radio-button>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="名字" name='name'>
        <t-input v-model="formData.name"></t-input>
      </t-form-item>
      <t-form-item label="密码" name='password'>
        <t-input v-model="formData.password" type="password"></t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit">登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
const INITIAL_DATA = {
  labelAlign: 'right',
  name: '',
  password: '',
};
export default {
  data() {
    return {
      formData: { ...INITIAL_DATA },
    };
  },
  methods: {
    onReset() {
      this.$message.success('重置成功');
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
  },
};
</script>

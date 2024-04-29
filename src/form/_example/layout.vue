<template>
  <t-space direction="vertical" size="large">
    <t-radio-group v-model="formData.layout" variant="default-filled">
      <t-radio-button value="vertical">纵向布局</t-radio-button>
      <t-radio-button value="inline">行内布局</t-radio-button>
    </t-radio-group>

    <t-form
      ref="form"
      :data="formData"
      label-width="calc(2em + 24px)"
      :layout="formData.layout"
      scroll-to-first-error="smooth"
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="名字" name="name">
        <t-input v-model="formData.name"></t-input>
      </t-form-item>

      <t-form-item label="密码" name="password">
        <t-input v-model="formData.password" type="password"></t-input>
      </t-form-item>
    </t-form>
  </t-space>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue-next';
import { reactive } from 'vue';

const formData = reactive({
  layout: 'inline',
  name: '',
  password: '',
});

const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};
</script>

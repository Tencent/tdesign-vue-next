<template>
  <t-space direction="vertical" size="large">
    <t-radio-group v-model="formData.labelAlign" variant="default-filled">
      <t-radio-button value="left">左对齐</t-radio-button>
      <t-radio-button value="right">右对齐</t-radio-button>
      <t-radio-button value="top">顶部对齐</t-radio-button>
    </t-radio-group>

    <t-form :data="formData" :label-align="formData.labelAlign" :label-width="60">
      <t-form-item label="姓名" name="name">
        <t-input v-model="formData.name"></t-input>
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input v-model="formData.password" type="password"></t-input>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit">登录</t-button>
      </t-form-item>
    </t-form>
  </t-space>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { FormProps } from 'tdesign-vue-next';
const formData: FormProps['data'] = reactive({
  labelAlign: 'right',
  name: '',
  password: '',
});
</script>

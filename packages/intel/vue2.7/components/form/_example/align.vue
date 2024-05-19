<template>
  <t-space direction="vertical" size="32px">
    <t-radio-group v-model="formData.labelAlign" variant="default-filled">
      <t-radio-button value="left">左对齐</t-radio-button>
      <t-radio-button value="right">右对齐</t-radio-button>
      <t-radio-button value="top">顶部对齐</t-radio-button>
    </t-radio-group>

    <t-form :data="formData" :labelAlign="formData.labelAlign" :labelWidth="100">
      <t-form-item name="name">
        <template #label>姓名</template>
        <t-input v-model="formData.name" placeholder="请输入姓名"></t-input>
      </t-form-item>
      <t-form-item label="初始密码" name="password">
        <t-input v-model="formData.password" type="password" placeholder="请输入初始密码"></t-input>
      </t-form-item>
    </t-form>
  </t-space>
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
};
</script>

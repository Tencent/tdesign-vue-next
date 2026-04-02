<template>
  <t-space direction="vertical" size="large">
    <t-radio-group v-model="resetType" variant="default-filled">
      <t-radio-button value="empty">重置为空</t-radio-button>
      <t-radio-button value="initial">
        <t-popup content="改变表单数据后，点击重置按钮，观察数据重置情况"> 重置为初始值 </t-popup>
      </t-radio-button>
    </t-radio-group>

    <!-- colon 表示，是否统一显示 label 冒号 -->
    <t-form ref="form" :data="formData" :reset-type="resetType" colon @reset="onReset" @submit="onSubmit">
      <t-form-item label="姓名" name="name">
        <t-input v-model="formData.name" placeholder="请输入内容"></t-input>
      </t-form-item>

      <t-form-item label="手机号码" name="tel">
        <t-input v-model="formData.tel" placeholder="请输入内容"></t-input>
      </t-form-item>

      <t-form-item label="课程" name="course">
        <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
      </t-form-item>

      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">提交</t-button>
          <t-button theme="default" variant="base" type="reset">重置</t-button>
          <t-button theme="default" variant="base" @click="resetPhoneNumber">只重置手机号码</t-button>
        </t-space>
      </t-form-item>
    </t-form>
  </t-space>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { MessagePlugin, FormProps, FormInstanceFunctions, CheckboxGroupProps, ButtonProps } from 'tdesign-vue-next';
const formData: FormProps['data'] = reactive({
  name: 'TDesign',
  tel: '12345678910',
  course: ['1'],
});
const form = ref<FormInstanceFunctions>(null);
const resetType = ref<FormProps['resetType']>('initial');
const courseOptions: CheckboxGroupProps['options'] = [
  {
    label: '语文',
    value: '1',
  },
  {
    label: '数学',
    value: '2',
  },
  {
    label: '英语',
    value: '3',
  },
];
const onReset: FormProps['onReset'] = () => {
  MessagePlugin.success('重置成功');
};
const onSubmit: FormProps['onSubmit'] = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.warning(firstError);
  }
};
const resetPhoneNumber: ButtonProps['onClick'] = () => {
  form.value?.reset({
    fields: ['tel'],
  });
};
</script>

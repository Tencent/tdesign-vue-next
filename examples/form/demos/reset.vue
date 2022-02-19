<template>
  <div>
    <div>
      <t-radio-group v-model="resetType" variant="default-filled">
        <t-radio-button value="empty">重置为空</t-radio-button>
        <t-radio-button value="initial">
          <t-popup content="改变表单数据后，点击重置按钮，观察数据重置情况"> 重置为初始值 </t-popup>
        </t-radio-button>
      </t-radio-group>
    </div>
    <br /><br />

    <!-- colon 表示，是否统一显示 label 冒号 -->
    <t-form :data="formData" :reset-type="resetType" colon @reset="onReset" @submit="onSubmit">
      <t-form-item label="姓名" name="name">
        <t-input v-model="formData.name" placeholder="请输入内容"></t-input>
      </t-form-item>
      <t-form-item label="手机号码" name="tel">
        <t-input v-model="formData.tel" placeholder="请输入内容"></t-input>
      </t-form-item>
      <t-form-item label="课程" name="course">
        <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
      </t-form-item>
      <t-form-item style="padding-top: 8px">
        <t-button theme="primary" type="submit" style="margin-right: 10px">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';

const INITIAL_DATA = {
  name: 'TDesign',
  tel: '12345678910',
  course: ['1'],
};
const courseOptions = [
  { label: '语文', value: '1' },
  { label: '数学', value: '2' },
  { label: '英语', value: '3' },
];
const resetType = ref('initial');
const formData = ref({ ...INITIAL_DATA });

const onReset = () => {
  MessagePlugin.success('重置成功');
};

const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Errors: ', validateResult);
    MessagePlugin.warning(firstError);
  }
};
</script>

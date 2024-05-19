<template>
  <t-space direction="vertical" size="32px">
    <t-radio-group v-model="resetType" variant="default-filled">
      <t-radio-button value="empty">重置为空</t-radio-button>
      <t-radio-button value="initial">
        <t-popup content="改变表单数据后，点击重置按钮，观察数据重置情况"> 重置为初始值 </t-popup>
      </t-radio-button>
    </t-radio-group>

    <!-- colon 表示，是否统一显示 label 冒号 -->
    <t-form ref="form" :data="formData" :resetType="resetType" colon @reset="onReset" @submit="onSubmit">
      <t-form-item label="姓名" name="name">
        <t-input v-model="formData.name" placeholder="请输入姓名" @enter="onEnter"></t-input>
      </t-form-item>
      <t-form-item label="手机号码" name="tel">
        <t-input v-model="formData.tel" placeholder="请输入手机号码" @enter="onEnter"></t-input>
      </t-form-item>
      <t-form-item label="课程" name="course">
        <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
      </t-form-item>
      <t-form-item style="margin-left: 100px">
        <t-space size="10px">
          <t-button theme="primary" type="submit">提交</t-button>
          <t-button theme="default" variant="base" type="reset">重置</t-button>
          <t-button theme="default" variant="base" @click="resetPhoneNumber">只重置手机号码</t-button>
        </t-space>
      </t-form-item>
    </t-form>
  </t-space>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue';
import { ref, reactive } from 'vue';
// 这是初始值，数据变化后可以设置表单重置为这个初始值
const INITIAL_DATA = {
  name: 'TDesign',
  tel: '18612345678',
  course: ['1'],
};
const form = ref();
const resetType = ref('initial');
const formData = reactive({
  ...INITIAL_DATA,
});
const courseOptions = ref([
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
]);
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
// 禁用 Input 组件，按下 Enter 键时，触发 submit 事件
const onEnter = (_, { e }) => {
  e.preventDefault();
};
// 重置指定字段：手机号码
const resetPhoneNumber = () => {
  form.value.reset({
    fields: ['tel'],
  });
};
</script>

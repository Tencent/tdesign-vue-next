<template>
  <div>
    <t-form
      :data="formData"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      :colon="true"
    >
      <t-form-item label="姓名" name='name'>
        <t-input v-model="formData.name" placeholder="请输入内容"></t-input>
      </t-form-item>
      <t-form-item label="手机号" name='tel'>
        <t-input v-model="formData.tel" placeholder="请输入内容"></t-input>
      </t-form-item>
      <t-form-item label="性别" name='gender'>
        <t-radio-group v-model="formData.gender">
          <t-radio value="1">男</t-radio>
          <t-radio value="2">女</t-radio>
        </t-radio-group>
      </t-form-item>
      <t-form-item label="课程" name='course'>
        <t-checkbox-group
          v-model="formData.course"
          :options="courseOptions"
        ></t-checkbox-group>
      </t-form-item>
      <t-form-item label="状态" name='status'>
        <t-switch v-model="formData.status"></t-switch>
      </t-form-item>
      <t-form-item>
        <t-button theme="primary" type="submit" style="margin-right: 10px">提交</t-button>
        <t-button theme="default" variant="base" type="reset">重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

const INITIAL_DATA = {
  name: '',
  tel: '',
  gender: '',
  course: [],
  status: false,
};

export default defineComponent({
  setup() {
    const formData = ref({ ...INITIAL_DATA });

    const onReset = () => {
      MessagePlugin.success('重置成功');
    }

    const onSubmit = ({ validateResult, firstError }) => {
      if (validateResult === true) {
        MessagePlugin.success('提交成功');
      } else {
        console.log('Validate Errors: ', firstError, validateResult);
        MessagePlugin.warning(firstError);
      }
    }

    return {
      formData,
      courseOptions: [
        { label: '语文', value: '1' },
        { label: '数学', value: '2' },
        { label: '英语', value: '3' },
      ],
      onReset,
      onSubmit
    }
  }
});
</script>

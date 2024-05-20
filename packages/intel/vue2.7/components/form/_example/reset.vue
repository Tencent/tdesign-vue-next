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
<script>
// 这是初始值，数据变化后可以设置表单重置为这个初始值
const INITIAL_DATA = {
  name: 'TDesign',
  tel: '18612345678',
  course: ['1'],
};

export default {
  data() {
    return {
      resetType: 'initial',
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

    // 禁用 Input 组件，按下 Enter 键时，触发 submit 事件
    onEnter(_, { e }) {
      e.preventDefault();
    },

    // 重置指定字段：手机号码
    resetPhoneNumber() {
      this.$refs.form.reset({ fields: ['tel'] });
    },
  },
};
</script>

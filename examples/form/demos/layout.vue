<template>
  <div>
    <div class="controls">
      <t-radio-group v-model="formData.layout" variant="default-filled">
        <t-radio-button value="vertical">纵向布局</t-radio-button>
        <t-radio-button value="inline">行内布局</t-radio-button>
      </t-radio-group>
    </div>
    <t-form
      :data="formData"
      :labelWidth="80"
      :layout="formData.layout"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      scrollToFirstError="smooth"
    >
      <t-form-item label="名字" name='name'>
        <t-input v-model="formData.name"></t-input>
      </t-form-item>
      <t-form-item label="密码" name='password'>
        <t-input v-model="formData.password" type="password"></t-input>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>

const INITIAL_DATA = {
  layout: 'inline',
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
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.$message.success('提交成功');
      } else {
        console.log('Errors: ', validateResult);
        this.$message.warning(firstError);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.controls {
  margin-bottom: 32px;
}
</style>

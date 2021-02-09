<template>
  <div>
    <t-row>
      <t-col>
        <t-radio-group v-model="formData.layout" buttonStyle="solid">
          <t-radio-button value="vertical">纵向布局</t-radio-button>
          <t-radio-button value="inline">行内布局</t-radio-button>
        </t-radio-group>
      </t-col>
    </t-row><br>
    <t-form
      :data="formData"
      ref="form"
      @reset="onReset"
      @submit="onSubmit"
      scrollToFirstError="smooth"
      :layout="formData.layout"
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

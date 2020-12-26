<template>
  <div>
    <t-form
      :data="formData"
      :rules="rules"
      ref="formValidatorStatus"
      @reset="onReset"
      @submit="onSubmit"
      :statusIcon="true"
    >
      <t-form-item label="失败" help="校验不通过，请输入正确内容" name='fail'>
        <t-input v-model="formData.fail"></t-input>
      </t-form-item>
      <t-form-item label="警告" name='warning'>
        <t-input v-model="formData.warning"></t-input>
      </t-form-item>
      <t-form-item label="成功" name='success'>
        <t-input v-model="formData.success"></t-input>
      </t-form-item>
      <t-form-item label="失败" name='failB' :statusIcon="false">
        <t-input v-model="formData.failB" placeholder="隐藏状态icon"></t-input>
      </t-form-item>
      <t-form-item label="警告" name='warningB' :statusIcon="true">
        <t-input v-model="formData.warningB"></t-input>
      </t-form-item>
      <t-form-item label="加载中" name='loading'>
        <t-input v-model="formData.loading" placeholder="正在校验中，请稍等"></t-input>
        <t-icon slot="statusIcon" name='loading' size="25px" style="color: #1890ff"/>
      </t-form-item>
      <t-form-item label="新增" name='add' help="自定义新增icon">
        <t-input v-model="formData.add"></t-input>
        <t-icon slot="statusIcon" name='add-rectangle' size="25px"/>
      </t-form-item>
      <t-form-item label="帮助" name='help' help="自定义帮助icon">
        <t-input v-model="formData.help"></t-input>
        <t-icon slot="statusIcon" name='help-circle' size="25px"/>
      </t-form-item>
      <t-form-item :statusIcon="false">
        <t-button theme="primary" type="submit" style="margin-right: 10px">提交</t-button>
        <t-button type="reset">重置</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script>

const INITIAL_DATA = {
  fail: '',
  warning: '',
  success: '',
  failB: '',
  warningB: '',
  loading: '',
  add: '',
  help: '',
};

export default {
  data() {
    return {
      formData: { ...INITIAL_DATA },
      rules: {
        fail: [
          { required: true, message: '必填', type: 'error' },
        ],
        warning: [
          { required: true, message: '必填', type: 'warning' },
        ],
        success: [],
        failB: [
          { required: true, message: '必填', type: 'error' },
        ],
        warningB: [
          { required: true, message: '必填', type: 'warning' },
        ],
      },
    };
  },
  mounted() {
    this.$refs.formValidatorStatus.validate();
  },

  methods: {
    onReset() {
      this.formData = { ...INITIAL_DATA };
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

<template>
  <div>
    <t-form
      :data="formData"
      :colon="colon"
      :requiredMark="requiredMark"
      :rules="rules"
    >
      <t-form-item label="姓名" name='name'>
        <t-input v-model="formData.name"></t-input>
      </t-form-item>
    </t-form>

    <br><br>
    <div>
      <div> <t-switch v-model="colon" /> 是否显示冒号 </div>
      <div> <t-switch v-model="requiredMark" /> 是否显示必填符号 </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '姓名必填' },
          { email: true, message: '格式必须为邮箱' },
        ],
      },
      colon: false,
      requiredMark: true,
    };
  },
};
</script>

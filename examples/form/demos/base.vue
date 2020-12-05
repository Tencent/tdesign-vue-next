<template>
  <div>
    <t-form :data="formData" :colon="colon" :requiredMark="requiredMark">
      <t-form-item label="姓名">
        <t-input></t-input>
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
      formData: {},
      colon: false,
      requiredMark: true,
    };
  },
};
</script>

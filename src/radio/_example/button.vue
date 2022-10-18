<template>
  <t-space>
    <t-radio-group default-value="3">
      <t-radio-button value="1"> 选项一 </t-radio-button>
      <t-radio-button value="3"> 选项二 </t-radio-button>
      <t-radio-button value="3" disabled> 选项三 </t-radio-button>
      <t-radio-button value="4" disabled> 选项四 </t-radio-button>
    </t-radio-group>
    <t-radio-group variant="default-filled" default-value="gz">
      <t-radio-button value="bj"> 选项一 </t-radio-button>
      <t-radio-button value="gz"> 选项二 </t-radio-button>
      <t-radio-button value="gz" disabled> 选项三 </t-radio-button>
      <t-radio-button value="sz" disabled> 选项四 </t-radio-button>
    </t-radio-group>
  </t-space>
</template>

<style scoped>
.t-radio-group {
  margin-bottom: 16px;
}
</style>

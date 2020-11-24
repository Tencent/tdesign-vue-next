<template>
  <div class="tdesign-radio-button">
    <t-radio-group>
      <t-radio-button value="1">选项一</t-radio-button>
      <t-radio-button value="2">选项二</t-radio-button>
      <t-radio-button value="3" :checked="true" disabled>选项三</t-radio-button>
      <t-radio-button value="4" :checked="false" disabled>选项四</t-radio-button>
    </t-radio-group>
    <br />
    <t-radio-group buttonStyle="solid">
      <t-radio-button value="bj">选项一</t-radio-button>
      <t-radio-button value="sh">选项二</t-radio-button>
      <t-radio-button value="3" :checked="true" disabled>选项三</t-radio-button>
      <t-radio-button value="sz">选项四</t-radio-button>
    </t-radio-group>
  </div>
</template>

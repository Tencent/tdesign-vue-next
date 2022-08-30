<template>
  <div class="tdesign-demo-block-column-large">
    <div class="tdesign-demo-block-column">
      <h5>边框型单选按钮</h5>
      <t-radio-group default-value="1">
        <t-radio-button value="1">选项一</t-radio-button>
        <t-radio-button value="2">选项二</t-radio-button>
        <t-radio-button value="3">选项三</t-radio-button>
        <t-radio-button value="4">选项四</t-radio-button>
        <t-radio-button value="5">选项五</t-radio-button>
      </t-radio-group>

      <t-radio-group disabled default-value="4">
        <t-radio-button value="1">选项一</t-radio-button>
        <t-radio-button value="2">选项二</t-radio-button>
        <t-radio-button value="3">选项三</t-radio-button>
        <t-radio-button value="4">选中禁用态</t-radio-button>
        <t-radio-button>未选中禁用态</t-radio-button>
      </t-radio-group>
    </div>
    <div class="tdesign-demo-block-column">
      <h5>填充型单选按钮</h5>
      <div>
        <t-radio-group variant="default-filled" default-value="1">
          <t-radio-button value="1">选项一</t-radio-button>
          <t-radio-button value="2">选项二</t-radio-button>
          <t-radio-button value="3">选项三</t-radio-button>
          <t-radio-button value="4">选项四</t-radio-button>
          <t-radio-button value="5">选项五</t-radio-button>
        </t-radio-group>
      </div>
      <div>
        <t-radio-group variant="primary-filled" default-value="1">
          <t-radio-button value="1">选项一</t-radio-button>
          <t-radio-button value="2">选项二</t-radio-button>
          <t-radio-button value="3">选项三</t-radio-button>
          <t-radio-button value="4">选项四</t-radio-button>
          <t-radio-button value="5">选项五</t-radio-button>
        </t-radio-group>
      </div>
      <div>
        <t-radio-group variant="default-filled" default-value="4">
          <t-radio-button value="1" disabled>选项一</t-radio-button>
          <t-radio-button value="2" disabled>选项二</t-radio-button>
          <t-radio-button value="3" disabled>选项三</t-radio-button>
          <t-radio-button value="4" disabled>选中禁用态</t-radio-button>
          <t-radio-button value="5" disabled>未选中禁用态</t-radio-button>
        </t-radio-group>
      </div>
      <div>
        <t-radio-group variant="primary-filled" default-value="4">
          <t-radio-button value="1" disabled>选项一</t-radio-button>
          <t-radio-button value="2" disabled>选项二</t-radio-button>
          <t-radio-button value="3" disabled>选项三</t-radio-button>
          <t-radio-button value="4" disabled>选中禁用态</t-radio-button>
          <t-radio-button value="5" disabled>未选中禁用态</t-radio-button>
        </t-radio-group>
      </div>
    </div>
  </div>
</template>

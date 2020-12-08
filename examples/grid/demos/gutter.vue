<template>
  <div class="tdesign-demo-item--grid">
    <t-row :gutter="16">
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>

    <t-row :gutter="{xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 40}">
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>

    <t-row :gutter="[16, 24]">
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>
  </div>
</template>


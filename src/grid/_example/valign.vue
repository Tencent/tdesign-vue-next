<template>
  <t-space direction="vertical">
    <p>align top</p>
    <t-row align="top" justify="center">
      <t-col :span="3">
        <div style="height: 100px">col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div style="height: 100px">col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>

    <p>align middle</p>
    <t-row align="middle" justify="space-around">
      <t-col :span="3">
        <div style="height: 100px">col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div style="height: 100px">col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>

    <p>align bottom</p>
    <t-row align="bottom" justify="space-between">
      <t-col :span="3">
        <div style="height: 100px">col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
      <t-col :span="3">
        <div style="height: 100px">col-3</div>
      </t-col>
      <t-col :span="3">
        <div>col-3</div>
      </t-col>
    </t-row>
  </t-space>
</template>

<template>
  <t-space direction="vertical">
    <span>align left</span>
    <t-row justify="start">
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
    </t-row>

    <span>align center</span>
    <t-row justify="center">
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
    </t-row>

    <span>align right</span>
    <t-row justify="end">
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
    </t-row>

    <span>space-between</span>
    <t-row justify="space-between">
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
    </t-row>

    <span>space-around</span>
    <t-row justify="space-around">
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
      <t-col :span="2">
        <div>col-2</div>
      </t-col>
    </t-row>
  </t-space>
</template>

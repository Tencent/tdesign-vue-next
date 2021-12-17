<template>
  <div class="tdesign-demo-block-column">
    <t-row>
      <t-col :span="9" :push="3">
        <div>col-9 col-pull-3</div>
      </t-col>
      <t-col :span="3" :pull="9">
        <div>col-3 col-pull-9</div>
      </t-col>
    </t-row>
  </div>
</template>

<template>
  <div class="tdesign-demo-item--grid">
    <t-row>
      <t-col :span="4">
        <div>col-4</div>
      </t-col>
      <t-col :span="4" :offset="4">
        <div>col-4 col-offset-4</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col :span="3" :offset="3">
        <div>col-3 col-offset-3</div>
      </t-col>
      <t-col :span="3" :offset="3">
        <div>col-3 col-offset-3</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col :span="6" :offset="3">
        <div>col-6 col-offset-3</div>
      </t-col>
    </t-row>
  </div>
</template>

<template>
  <div class="t-design-demo-item--grid">
    <t-row>
      <t-col :span="8">
        <div>col-8</div>
      </t-col>
      <t-col :span="8" :offset="8">
        <div>col-8 offset-8</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col :span="6" :offset="6">
        <div>col-6 offset-6</div>
      </t-col>
      <t-col :span="6" :offset="6">
        <div>col-6 offset-6</div>
      </t-col>
    </t-row>

    <t-row>
      <t-col :span="12" :offset="6">
        <div>col-12 offset-6</div>
      </t-col>
    </t-row>
  </div>
</template>


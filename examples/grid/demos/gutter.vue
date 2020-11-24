<template>
  <div class="t-design-demo-item--grid">
    <t-row :gutter="8">
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
    </t-row>
    <t-row :gutter="{xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48}">
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
    </t-row>
    <t-row :gutter="[8, 16]">
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
      <t-col :span="6">
        <div>col-6</div>
      </t-col>
    </t-row>
  </div>
</template>

<style lang="less" scoped>
[class*='t-design-demo-item--grid'] {
  .t-col > div {
    min-height: 40px;
    margin-top: 8px;
    margin-bottom: 8px;
    background: #0050e1;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }

  .t-col:nth-of-type(2n) > div {
    background: #2a6fdf;
  }
}

</style>

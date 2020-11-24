<template>
  <div class="t-design-demo-item--grid">
    <t-row align="top">
      <t-col :span="4">
        <div>col-4</div>
      </t-col>
      <t-col :span="4">
        <div style="height: 100px;">col-4</div>
      </t-col>
      <t-col :span="4">
        <div>col-4</div>
      </t-col>
      <t-col :span="4">
        <div style="height: 100px;">col-4</div>
      </t-col>
    </t-row>
    <t-row align="middle">
      <t-col :span="4">
        <div>col-4</div>
      </t-col>
      <t-col :span="4">
        <div style="height: 100px;">col-4</div>
      </t-col>
      <t-col :span="4">
        <div>col-4</div>
      </t-col>
      <t-col :span="4">
        <div style="height: 100px;">col-4</div>
      </t-col>
    </t-row>
    <t-row align="bottom">
      <t-col :span="4">
        <div>col-4</div>
      </t-col>
      <t-col :span="4">
        <div style="height: 100px;">col-4</div>
      </t-col>
      <t-col :span="4">
        <div>col-4</div>
      </t-col>
      <t-col :span="4">
        <div style="height: 100px;">col-4</div>
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

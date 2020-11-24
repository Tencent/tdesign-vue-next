<template>
  <div class="t-design-demo-item--grid">
    <t-row>
      <t-col :span="18" :push="6">
        <div>col-18 col-pull-6</div>
      </t-col>
      <t-col :span="6" :pull="18">
        <div>col-6 col-pull-18</div>
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

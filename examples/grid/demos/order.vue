<template>
  <div class="t-design-demo-item--grid">
    <t-row>
      <t-col :span="6" :order="4">
        <div>1 col-6-order-4</div>
      </t-col>
      <t-col :span="6" :order="3">
        <div>2 col-6-order-3</div>
      </t-col>
      <t-col :span="6" :order="2">
        <div>3 col-6-order-2</div>
      </t-col>
      <t-col :span="6" :order="1">
        <div>4 col-6-order-1</div>
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

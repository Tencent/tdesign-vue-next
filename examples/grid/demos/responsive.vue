<template>
  <div class="t-design-demo-item--grid">
    <t-row>
      <t-col :xs="1" :sm="4" :md="6" :lg="8" :xl="10">
        <div>Col</div>
      </t-col>
      <t-col :xs="22" :sm="16" :md="12" :lg="8" :xl="4">
        <div>Col</div>
      </t-col>
      <t-col :xs="1" :sm="4" :md="6" :lg="8" :xl="10">
        <div>Col</div>
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

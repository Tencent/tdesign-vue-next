<template>
  <div class="t-demo-iconfont">
    <div>
      <t-icon name="cps-icon-home-sheep" :url="newSvgUrl" />
      <t-icon name="cps-icon-home-sheep" :url="newSvgUrl" size="medium" />
      <t-icon name="cps-icon-home-sheep" :url="newSvgUrl" size="large" />
      <t-icon name="cps-icon-home-sheep" :url="newSvgUrl" size="25px" />
      <t-icon name="cps-icon-home-sheep" :url="newSvgUrl" size="2em" />
    </div>
    <br />
    <div>
      <t-icon name="cps-icon-home-sheep" :url="newSvgUrl" style="color: red" />
      <t-icon name="cps-icon-home-sheep" :url="newSvgUrl" style="color: green" />
      <t-icon name="cps-icon-home-sheep" :url="newSvgUrl" style="color: orange" />
      <!-- 引入新 Icon 之后，内置 Icon 依旧有效。name 传入图标名称全称。 -->
      <t-icon name="t-icon-home" :url="newSvgUrl" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newSvgUrl: 'https://tdesign.gtimg.com/icon/default-demo/index.js',
    };
  },
};
</script>

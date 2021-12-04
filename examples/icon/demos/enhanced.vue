<template>
  <div class="t-demo-iconfont">
    <div>
      <icon name="cps-icon-home-sheep" :url="newSvgUrl" />
      <icon name="cps-icon-home-sheep" :url="newSvgUrl" size="medium" />
      <icon name="cps-icon-home-sheep" :url="newSvgUrl" size="large" />
      <icon name="cps-icon-home-sheep" :url="newSvgUrl" size="25px" />
      <icon name="cps-icon-home-sheep" :url="newSvgUrl" size="2em" />
    </div>
    <br />
    <div>
      <icon name="cps-icon-home-sheep" :url="newSvgUrl" style="color: red" />
      <icon name="cps-icon-home-sheep" :url="newSvgUrl" style="color: green" />
      <icon name="cps-icon-home-sheep" :url="newSvgUrl" style="color: orange" />
      <!-- 引入新 Icon 之后，内置 Icon 依旧有效。name 传入图标名称全称。 -->
      <icon name="t-icon-home" :url="newSvgUrl" />
    </div>
  </div>
</template>

<script>
import { Icon } from 'tdesign-icons-vue-next';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      newSvgUrl: 'https://tdesign.gtimg.com/icon/default-demo/index.js',
    };
  },
};
</script>

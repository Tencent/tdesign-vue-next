<template>
  <div class="t-demo-iconfont">
    <div>
      <t-icon name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" />
      <t-icon name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" size="medium" />
      <t-icon name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" size="large" />
      <t-icon name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" size="25px" />
      <t-icon name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" size="2em" />
    </div>
    <br />
    <div>
      <t-icon name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" style="color: red" />
      <t-icon name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" style="color: green" />
      <t-icon name="cps-icon cps-icon-home-sheep" :url="newIconfontUrl" style="color: orange" />
      <!-- 引入新 Icon 之后，内置 Icon 依旧有效。name 传入图标名称全称。 -->
      <t-icon name="t-icon-home" :url="newIconfontUrl" />
    </div>
    <br />
  </div>
</template>

<script>
import TIcon from 'tdesign-vue-next/icon/iconfont';

export default {
  components: { TIcon },
  data() {
    return {
      newIconfontUrl: 'https://tdesign.gtimg.com/icon/default-demo/index.css',
    };
  },
};
</script>

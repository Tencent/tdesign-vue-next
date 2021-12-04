<template>
  <!--
    该文件由脚本 TDesignOteam/tdesign-vue/script/icon-generate/index.js 自动生成。
    若需要编辑，请编辑源文件：TDesignOteam/tdesign-vue/script/icon-generate/demo.tpl 。
  -->
  <div class="t-demo-iconfont">
    <%= icons %>
  </div>
</template>

<script>
import { Icon } from 'tdesign-icons-vue-next';

export default {
  components: {
    Icon,
  },
};
</script>
<style lang="less">
  .t-demo-iconfont {
    .t-demo-icon {
      width: 130px;
      height: 100px;
      margin-right: 24px;
      display: inline-block;
      text-align: center;
      vertical-align: top;
      .t-icon {
        font-size: 25px;
        margin-right: 0;
        transition: all .2s;
      }
      .t-icon:hover {
        color: #0052d9;
        font-size: 30px;
        transition: all .2s;
      }
      .t-demo-icon-name {
        text-align: center;
        margin-top: 8px;
        font-size: 12px;
      }
    }
  }
</style>

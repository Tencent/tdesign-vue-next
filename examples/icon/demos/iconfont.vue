<template>
  <div class="t-demo-iconfont">
    <p>
      使用 Iconfont 图标需要单独引入 Iconfont 图标组件：<code>import TIcon from '@/src/icon/iconfont';</code><br>
    </p><br>
    <div class="t-demo-row">
      <t-icon name="loading"/>
      <t-icon name="close" @click.native="onIconClose"/>
      <t-icon name="success_fill"/>
    </div><br>
    <div class="t-demo-row">
      <t-icon name="success_fill" size="xs"/>
      <t-icon name="success_fill" size="small"/>
      <t-icon name="success_fill" />
      <t-icon name="success_fill" size="middle" />
      <t-icon name="success_fill" size="large" />
      <t-icon name="success_fill" size="xl" />
      <t-icon name="success_fill" size="25px" />
      <t-icon name="success_fill" size="2em" />
    </div><br>
    <div class="t-demo-row">
      <t-icon name="success_fill" style="color: red"/>
      <t-icon name="success_fill" style="color: green"/>
      <t-icon name="success_fill" style="color: orange"/>
    </div>
  </div>
</template>

<script>
import TIcon from '@/src/icon/iconfont';
export default {
  components: { TIcon },
  methods: {
    onIconClose() {
      console.log('icon was clicked.');
    },
  },
};
</script>

<template>
  <div>
    <p>插件调用</p>
    <!-- this.$notify 和 this.$notification 都支持，两者等价 -->
    <br />
    <div>
      <t-button
        variant="outline"
        @click="$notify.info({ title: '标题名称', icon: false, content: '用户表示普通操作的消息通知', duration: 1000 })"
        >1000s</t-button
      >

      <!-- 自定义 Icon 示例 -->
      <t-button
        variant="outline"
        @click="
          $notify.info({ title: '标题名称', icon: iconRender, content: '用户表示操作错误的消息通知', duration: 2000 })
        "
        >2000s</t-button
      >

      <t-button
        variant="outline"
        @click="$notify('info', { title: '标题名称', content: '用户表示操作引起一定后果的消息通知' })"
        >默认时长</t-button
      >
      <!-- 0 表示永远不自动消失 -->
      <t-button
        variant="outline"
        @click="
          $notify.info({
            title: '标题名称',
            content: '用户表示操作引起严重后果的消息通知',
            duration: 0,
            closeBtn: true,
          })
        "
      >
        永久显示
      </t-button>
    </div>
    <br /><br />

    <!-- NotifyPlugin 和 NotificationPlugin 都支持，两者等价 -->
    <p>函数调用</p>
    <br />
    <div class="t-demo-message-theme">
      <t-button variant="outline" @click="NotifyPlugin.info({ title: '标题', content: '用户表示普通操作信息提示' })"
        >info</t-button
      >
      <t-button variant="outline" @click="NotifyPlugin.success({ title: '标题', content: '用户表示操作顺利达成' })"
        >success</t-button
      >
      <t-button
        variant="outline"
        @click="NotifyPlugin('warning', { title: '标题', content: '用户表示操作引起一定后果' })"
        >warning</t-button
      >
      <t-button
        variant="outline"
        @click="NotifyPlugin('error', { title: '标题', content: '用户表示操作引起严重的后果' })"
        >error</t-button
      >
    </div>
    <br /><br />
  </div>
</template>
<script lang="jsx">
import { NotifyPlugin } from 'tdesign-vue-next';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

export default {
  data() {
    return {
      NotifyPlugin,
    };
  },
  methods: {
    closeBtn(close) {
      return (
        <b class="t-message__close" onClick={close}>
          x
        </b>
      );
    },
    content() {
      return (
        <div>
          操作有误，<a href="#">前往查看</a>
        </div>
      );
    },
    footer() {
      return (
        <div class="t-notification__detail">
          <span class="t-notification__detail-item t-is-active">查看详情</span>
        </div>
      );
    },
    iconRender() {
      return <CloseCircleFilledIcon size="24px" style={{ color: 'rgb(227, 77, 89)', marginRight: '8px' }} />;
    },
  },
};
</script>
<style scoped>
.t-button + .t-button {
  margin-left: 16px;
}
</style>

<template>
  <div>
    <p>组件实例方法调用</p>
    <p>notify.success({ title: '标题名称', content: '用户表示普通操作信息提示' })</p>
    <p>notify('success', { title: '标题名称', content: '用户表示普通操作信息提示', duration: 1000 })</p>
    <br>
    <div>
      <t-button @click="$notify.info({ title: '标题名称',content: '用户表示普通操作的消息通知', duration: 1000 })">
        1000s
      </t-button>
      <t-button @click="$notify.success({ title: '标题名称',content: '用户表示操作顺利的消息通知', duration: 2000 })">
        2000s
      </t-button>
      <t-button @click="$notify('warning', { title: '标题名称', content: '用户表示操作引起一定后果的消息通知' })">
        默认时长
      </t-button>
      <!-- 0 表示永远不自动消失 -->
      <t-button @click="$notify.error({ title: '标题名称',content: '用户表示操作引起严重后果的消息通知', duration: 0, closeBtn: true })">
        永久显示
      </t-button>
    </div>
    <br><br>

    <p>插件方法调用</p>
    <p>NotifyPlugin.success({ content: '用户表示普通操作信息提示' })</p>
    <p>NotifyPlugin('success', { content: '用户表示普通操作信息提示', duration: 1000 })</p>
    <br>
    <br>
    <div class="t-demo-message-theme">
      <t-button @click="NotifyPlugin.info({ title: '标题', content: '用户表示普通操作信息提示' })">
        info
      </t-button>
      <t-button @click="NotifyPlugin.success({ title: '标题', content: '用户表示操作顺利达成' })">
        success
      </t-button>
      <t-button @click="NotifyPlugin('warning', { title: '标题', content: '用户表示操作引起一定后果' })">
        warning
      </t-button>
      <t-button @click="NotifyPlugin('error', { title: '标题', content: '用户表示操作引起严重的后果' })">
        error
      </t-button>
    </div>
    <br><br>
  </div>
</template>

<script lang="jsx">
import { NotifyPlugin } from '@tencent/tdesign-vue-next';

export default {
  data() {
    return {
      NotifyPlugin,
    };
  },
  methods: {
    closeBtn(close) {
      return <b class='t-message-close' onClick={close}>x</b>;
    },
    content() {
      return <div>操作有误，<a href='#'>前往查看</a></div>;
    },
    footer() {
      return (<div class="t-notification__detail">
        <span class="t-notification__detail--item t-is-active">查看详情</span>
      </div>);
    },
  },
};
</script>

<style scoped>
  .t-button + .t-button {
    margin-left: 16px;
  }
</style>

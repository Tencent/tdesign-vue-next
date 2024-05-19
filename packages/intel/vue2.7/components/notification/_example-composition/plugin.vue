<template>
  <t-space direction="vertical" :size="42">
    <t-space direction="vertical">
      <p>插件调用</p>
      <!-- this.$notify 和 this.$notification 都支持，两者等价 -->
      <t-space>
        <t-button
          variant="outline"
          @click="
            $notify.info({ title: '标题名称', icon: false, content: '用户表示普通操作的消息通知', duration: 1000 })
          "
        >1000ms</t-button
        >

        <!-- 自定义 Icon 示例 -->
        <t-button
          variant="outline"
          @click="
            $notify.info({ title: '标题名称', icon: iconRender, content: '用户表示操作错误的消息通知', duration: 2000 })
          "
        >2000ms</t-button
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
      </t-space>
    </t-space>

    <!-- NotifyPlugin 和 NotificationPlugin 都支持，两者等价 -->
    <t-space direction="vertical">
      <p>函数调用</p>
      <t-space>
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
      </t-space>
    </t-space>
  </t-space>
</template>

<script setup lang="jsx">
import { NotifyPlugin } from 'tdesign-vue';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue';

const iconRender = () => (
    <CloseCircleFilledIcon
      size="24px"
      style={{
        color: 'rgb(227, 77, 89)',
        marginRight: '8px',
      }}
    />
);
</script>

<template>
  <div id="t-demo-message-toggle">
    <t-button variant="outline" @click="closeFunc">测试触发onClose</t-button>
  </div>
</template>

<script lang="ts" setup>
import { MessagePlugin, ButtonProps } from 'tdesign-vue-next';
const closeFunc: ButtonProps['onClick'] = () => {
  MessagePlugin.info({
    content: '调用关闭函数关闭信息提示框',
    // 层级控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
    zIndex: 1001,
    // 挂载元素控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
    attach: '#t-demo-message-toggle',
    closeBtn: true,
    onClose: ({ trigger, e }) => {
      console.log('onClose', {
        trigger,
        e,
      });
    },
    onDurationEnd: () => {
      console.log('onDurationEnd');
    },
    onCloseBtnClick: ({ e }) => {
      console.log('onCloseBtnClick', {
        e,
      });
    },
  });
};
</script>

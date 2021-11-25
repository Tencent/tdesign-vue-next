<template>
  <div id="t-demo-message-toggle">
    <t-button variant="outline" @click="closeFunc"> 自由控制关闭时机（{{ msg ? '关闭' : '打开' }}） </t-button>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

export default defineComponent({
  setup() {
    const msg = ref(null);
    const closeFunc = () => {
      if (!msg.value) {
        msg.value = MessagePlugin.info({
          content: '调用关闭函数关闭信息提示框',
          duration: 0,
          // 层级控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
          zIndex: 1001,
          // 挂载元素控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
          attach: '#t-demo-message-toggle',
        });
      } else {
        // 关键代码
        // 另一种关闭方法：this.msg.then(ins => ins.close());
        MessagePlugin.close(msg.value);
        msg.value = null;
      }
    };
    return {
      msg,
      closeFunc,
    };
  },
});
</script>

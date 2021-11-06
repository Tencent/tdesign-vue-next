<template>
  <div>
    <p>插件调用</p>
    <br>
    <div class='t-demo-message-duration'>
      <t-button theme="primary" variant="outline" @click="$message.info('用户表示普通操作信息提示')">消息</t-button>
      <t-button theme="success" variant="outline" @click="$message.success({ content: '用户表示操作顺利达成', duration: 2000 })">
        成功
      </t-button>
      <t-button theme="warning" variant="outline" @click="$message('warning', '用户表示操作引起一定后果')">警示</t-button>
      <t-button
        theme="danger"
        variant="outline"
        @click="$message('error', { content: '用户表示操作引起严重的后果', duration: 4000 })"
      >
        失败
      </t-button>
      <t-button theme="primary" variant="outline" @click="$message.question('用于帮助用户操作的信息提示', 5000)">询问</t-button>
      <!-- 0 表示永远不自动消失 -->
      <t-button theme="primary" variant="outline" @click="$message.loading('用于表示操作正在生效的过程中', 0)">加载中</t-button>
      <t-button theme="default" variant="outline" @click="$message.closeAll()">关闭所有</t-button>
    </div>
    <br><br>


    <p>函数式调用</p>
    <br>
    <div class='t-demo-message-theme'>
      <t-button theme="primary" variant="outline" @click="MessagePlugin.info('用户表示普通操作信息提示')">消息</t-button>
      <t-button theme="success" variant="outline" @click="MessagePlugin.success('用户表示操作顺利达成')">成功</t-button>
      <t-button theme="warning" variant="outline" @click="MessagePlugin.warning({ content: '用户表示操作引起一定后果' })">
        警示
      </t-button>
      <t-button theme="danger" variant="outline" @click="MessagePlugin.error({ content: content })">失败</t-button>
      <t-button theme="primary" variant="outline" @click="MessagePlugin.question('用于帮助用户操作的信息提示')">询问</t-button>
      <t-button theme="primary" variant="outline" @click="MessagePlugin.loading('用于表示操作正在生效的过程中')">加载中</t-button>
      <t-button theme="default" variant="outline" @click="MessagePlugin.closeAll()">关闭所有</t-button>
    </div>
    <br><br>
  </div>
</template>

<script lang="jsx">
import { defineComponent } from 'vue';
import { MessagePlugin } from '@tencent/tdesign-vue-next';

export default defineComponent({
  setup() {
    return {
      MessagePlugin,
      content() {
        return <div>操作有误，<a href='#'>前往查看</a></div>;
      },
    }
  }
});
</script>

<style scoped>
  .t-button + .t-button {
    margin-left: 16px;
  }
</style>

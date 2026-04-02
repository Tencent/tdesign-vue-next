<template>
  <t-space :size="160">
    <t-popconfirm theme="default" content="确认删除订单吗">
      <t-button>删除订单</t-button>
    </t-popconfirm>

    <!-- 受控用法：自由控制浮层显示与否 -->
    <t-popconfirm
      :visible="visible"
      theme="default"
      content="是否提交审核？（自由控制浮层显示或隐藏）"
      @visible-change="onVisibleChange"
    >
      <t-button>提交审核</t-button>
    </t-popconfirm>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { MessagePlugin, PopconfirmProps } from 'tdesign-vue-next';
const visible = ref(false);
const onVisibleChange: PopconfirmProps['onVisibleChange'] = (val, context = {}) => {
  if (context && context.trigger === 'confirm') {
    const msg = MessagePlugin.info('提交中');
    const timer = setTimeout(() => {
      MessagePlugin.close(msg);
      MessagePlugin.success('提交成功！');
      visible.value = false;
      clearTimeout(timer);
    }, 1000);
  } else {
    visible.value = val;
  }
};
</script>

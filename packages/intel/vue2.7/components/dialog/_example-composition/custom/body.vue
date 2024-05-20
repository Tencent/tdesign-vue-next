<template>
  <div>
    <t-space break-line>
      <t-button theme="primary" @click="visible1 = true">隐藏标题</t-button>
      <t-button theme="primary" @click="visible2 = true">隐藏底部</t-button>
      <t-button theme="primary" @click="visible3 = true">渲染函数定义内容</t-button>
      <t-button theme="primary" @click="visible4 = true">插槽方式定义内容</t-button>
    </t-space>
    <t-dialog :header="false" body="对话框内容" :visible="visible1" :onClose="close1" :onConfirm="close1">
      <div slot="body">
        <div>不需要标题的内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
    </t-dialog>

    <t-dialog :visible="visible2" header="提示" body="对话框内容" :footer="false" :onClose="close2" :onConfirm="close2">
      <div slot="body">
        <div>不需要底部按钮的内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
    </t-dialog>

    <t-dialog :visible="visible3" header="对话框标题" :body="renderDialog3Body" :onClose="close3" :onConfirm="close3">
      <div slot="body">被渲染函数覆盖的插槽内容</div>
    </t-dialog>

    <t-dialog header="对话框标题" :visible="visible4" :onClose="close4" :onConfirm="close4">
      <div slot="body">
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
    </t-dialog>
  </div>
</template>
<script setup>
import { h, ref } from 'vue';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const renderDialog3Body = () => h('div', [h('div', '参数传递优先于插槽内容'), '这是渲染函数输出结果']);
const close1 = () => {
  visible1.value = false;
};
const close2 = () => {
  visible2.value = false;
};
const close3 = () => {
  visible3.value = false;
};
const close4 = () => {
  visible4.value = false;
};
</script>

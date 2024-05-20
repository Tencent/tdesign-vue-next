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
<script>
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
    };
  },
  methods: {
    renderDialog3Body() {
      return this.$createElement('div', [this.$createElement('div', '参数传递优先于插槽内容'), '这是渲染函数输出结果']);
    },

    close1() {
      this.visible1 = false;
    },
    close2() {
      this.visible2 = false;
    },
    close3() {
      this.visible3 = false;
    },
    close4() {
      this.visible4 = false;
    },
  },
});
</script>

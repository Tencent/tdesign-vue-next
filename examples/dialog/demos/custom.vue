<template>
  <div>
    <t-button theme="primary" @click="()=>this.visible1 = true">隐藏标题</t-button>
    <t-button theme="primary" @click="()=>this.visible2 = true">隐藏底部</t-button>
    <t-button theme="primary" @click="()=>this.visible3 = true">渲染函数定义内容</t-button>
    <t-button theme="primary" @click="()=>this.visible4 = true">插槽方式定义内容</t-button>

    <t-dialog v-model="visible1" :close="()=>this.visible1 = false" :header="false">
      <h2 slot="header">被隐藏标题</h2>
      <div slot="body">
        <div>不需要标题的内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
    </t-dialog>
    <t-dialog v-model="visible2" :close="()=>this.visible2 = false" header="提示" :footer="false">
      <div slot="body">
        <div>不需要底部按钮的内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </div>
    </t-dialog>
    <t-dialog
      v-model="visible3"
      :close="()=>this.visible3 = false"
      header="标题"
      :body="renderDialog3Body"
    >
      <div slot="header">被渲染函数覆盖的插槽内容</div>
      <div slot="body">被渲染函数覆盖的插槽内容</div>
    </t-dialog>
    <t-dialog v-model="visible4" :close="()=>this.visible4 = false">
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
<script lang="ts">
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
      return this.$createElement('div', [
        this.$createElement('h1', '参数传递优先于插槽内容'),
        '这是渲染函数输出结果',
      ]);
    },
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>

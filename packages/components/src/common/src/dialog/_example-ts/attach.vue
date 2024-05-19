<template>
  <div class="dialog-attach-wrap">
    <!-- attach挂载 -->
    <t-space>
      <t-button theme="primary" @click="visibleBody = true">挂载在body</t-button>
      <t-button theme="primary" @click="visibleIdAttach = true">挂载特定元素</t-button>
      <t-button theme="primary" @click="visibleFunctionAttach = true">挂载函数返回节点</t-button>
      <t-button theme="primary" @click="visibleShowInAttachedElement = true">展示在挂载元素区域</t-button>
    </t-space>

    <t-dialog
      v-model:visible="visibleBody"
      attach="body"
      header="挂载在body"
      destroy-on-close
      :on-confirm="() => (visibleBody = false)"
    >
      <template #body>
        <div>我是被挂载到body元素的对话框</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>

    <t-dialog
      v-model:visible="visibleIdAttach"
      attach="#app"
      header="挂载到id为app的元素"
      destroy-on-close
      :on-confirm="() => (visibleIdAttach = false)"
    >
      <template #body>
        <div>通过querySelect指定元素挂载</div>
        <div>支持原生document.querySelect选择元素</div>
        <div>querySelect获取到的第一个元素为挂载点</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>

    <t-dialog
      v-model:visible="visibleFunctionAttach"
      :attach="getAttach"
      destroy-on-close
      header="函数返回挂载节点"
      :on-confirm="() => (visibleFunctionAttach = false)"
    >
      <template #body>
        <div>指定函数返回的节点为挂载点</div>
        <div>函数返回为DOM节点对象</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </template>
    </t-dialog>

    <t-dialog
      v-model:visible="visibleShowInAttachedElement"
      header="对话框仅展示在挂载元素区域"
      destroy-on-close
      :show-in-attached-element="true"
      placement="center"
      :on-confirm="() => (visibleShowInAttachedElement = false)"
    >
      <div slot="body">
        <div>父元素（挂载元素）需要有定位属性，如：position: relative</div>
        <div>showInAttachedElement API 仅针对模态对话框有效</div>
      </div>
    </t-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue';
import { DialogProps } from 'tdesign-vue-next';
const visibleBody = ref(false);
const visibleIdAttach = ref(false);
const visibleFunctionAttach = ref(false);
const visibleShowInAttachedElement = ref(false);
const { ctx } = getCurrentInstance();
const getAttach: DialogProps['attach'] = () => ctx.$root.$el;
</script>
<style scoped>
.dialog-attach-wrap {
  position: relative;
  height: 400px;
  padding: 20px;
  border: 1px solid #ebedf0;
  border-radius: 2px;
  overflow: hidden;
}
body {
  width: 3000px;
}
</style>

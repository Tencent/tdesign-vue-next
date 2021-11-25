<template>
  <div>
    <!-- attach挂载 -->
    <t-button theme="primary" @click="visibleBody = true"> 挂载在body </t-button>
    <t-button theme="primary" @click="visibleIdAttach = true"> 挂载特定元素 </t-button>
    <!-- <t-button theme="primary" @click="visibleFunctionAttach = true">挂载函数返回节点</t-button> -->

    <t-dialog v-model:visible="visibleBody" attach="body" header="挂载在body" :on-confirm="() => (visibleBody = false)">
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
  </div>
</template>
<script>
import { defineComponent, ref, getCurrentInstance } from 'vue';

export default defineComponent({
  setup() {
    const visibleBody = ref(false);
    const visibleIdAttach = ref(false);
    const visibleFunctionAttach = ref(false);
    const { ctx } = getCurrentInstance();
    const getAttach = () => ctx.$root.$el;
    return {
      visibleBody,
      visibleIdAttach,
      visibleFunctionAttach,
      getAttach,
    };
  },
});
</script>
<style scoped>
.t-button {
  margin-right: 20px;
}
</style>

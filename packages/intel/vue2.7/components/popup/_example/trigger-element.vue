<template>
  <t-space direction="vertical">
    <!-- 总共四种自定义触发元素的方式 -->
    <t-space>
      <t-space>
        <t-popup content="我的触发元素通过默认插槽渲染">
          <t-button variant="outline">默认插槽定义触发元素</t-button>
        </t-popup>
      </t-space>
      <t-space>
        <t-popup content="我的触发元素通过插槽(triggerElement)渲染">
          <t-button variant="outline" slot="triggerElement">具名插槽定义触发元素</t-button>
        </t-popup>
      </t-space>
    </t-space>
    <t-space>
      <t-space>
        <t-popup content="我的触发元素通过渲染函数 default 渲染" :default="renderTriggerElement1"></t-popup>
      </t-space>
      <t-space>
        <t-popup
          content="我的触发元素通过渲染函数 triggerElement 渲染"
          :triggerElement="renderTriggerElement2"
        ></t-popup>
      </t-space>
    </t-space>
  </t-space>
</template>

<script lang="jsx">
export default {
  methods: {
    renderTriggerElement1() {
      return <t-button variant="outline">渲染函数定义触发元素1</t-button>;
    },
    renderTriggerElement2() {
      return <t-button variant="outline">渲染函数定义触发元素2</t-button>;
    },
  },
};
</script>
<style scoped>
.t-popup-demo-base-item {
  display: inline-block;
  width: 200px;
}
.t-popup-demo-base-item + .t-popup-demo-base-item {
  margin-left: 30px;
}
</style>

<template>
  <t-space direction="vertical">
    <!-- 总共四种自定义触发元素的方式 -->
    <t-space size="large">
      <div class="t-popup-demo-base-item">
        <t-popup content="我的触发元素通过默认插槽渲染">
          <t-button variant="outline">默认插槽定义触发元素</t-button>
        </t-popup>
      </div>
      <div class="t-popup-demo-base-item">
        <t-popup content="我的触发元素通过插槽(triggerElement)渲染">
          <template #triggerElement>
            <t-button variant="outline">具名插槽定义触发元素</t-button>
          </template>
        </t-popup>
      </div>
    </t-space>

    <t-space size="large">
      <div class="t-popup-demo-base-item">
        <t-popup content="我的触发元素通过渲染函数 default 渲染" :default="renderTriggerElement1" />
      </div>
      <div class="t-popup-demo-base-item">
        <t-popup content="我的触发元素通过渲染函数 triggerElement 渲染" :trigger-element="renderTriggerElement2" />
      </div>
    </t-space>
    <t-space size="large">
      <t-button id="trigger-element" variant="outline">提供字符串选择器选择触发元素</t-button>
      <t-popup content="我的触发元素通过 triggerElement 字符串选择已有元素" trigger-element="#trigger-element" />
    </t-space>
  </t-space>
</template>

<script setup lang="jsx">
const renderTriggerElement1 = () => {
  return <t-button variant="outline">渲染函数定义触发元素1</t-button>;
};
const renderTriggerElement2 = () => {
  return <t-button variant="outline">渲染函数定义触发元素2</t-button>;
};
</script>
<style scoped>
.t-popup-demo-base-item {
  display: inline-block;
  width: 200px;
}
</style>

<template>
  <div>
    <div class="t-popup-demo-base-item">
      <t-popup content="我的触发元素通过默认插槽渲染">
        <t-button variant="outline">触发元素(默认插槽)</t-button>
      </t-popup>
    </div>
    <div class="t-popup-demo-base-item">
      <t-popup content="我的触发元素通过插槽(triggerElement)渲染">
        <template #triggerElement>
          <t-button variant="outline">触发元素(插槽)</t-button>
        </template>
      </t-popup>
    </div>
    <div class="t-popup-demo-base-item">
      <t-popup
        content="我的触发元素通过属性 default 渲染"
        :default="renderTrigerElement1"
      ></t-popup>
    </div>
    <div class="t-popup-demo-base-item">
      <t-popup
        content="我的触发元素通过属性 triggerElement 渲染"
        :triggerElement="renderTrigerElement2"
      ></t-popup>
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      renderTrigerElement1() {
        return <t-button variant="outline">触发元素(属性1)</t-button>;
      },
      renderTrigerElement2() {
        return <t-button variant="outline">触发元素(属性2)</t-button>;
      },
    }
  }
});
</script>
<style scoped>
.t-popup-demo-base-item {
  display: inline-block;
}
.t-popup-demo-base-item + .t-popup-demo-base-item {
  margin-left: 30px;
}
</style>

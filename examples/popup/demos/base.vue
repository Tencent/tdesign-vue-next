<template>
  <div>
    <!-- 共三种方式自定义浮层内容 -->

    <!-- 使用 content 属性渲染浮层内容 -->
    <div class="t-popup-demo-base-item">
      <t-popup content="可以在浮层内容中描述禁用原因">
        <t-button variant="outline" disabled>禁用状态</t-button>
      </t-popup>
    </div>

    <!-- 使用 content 插槽渲染浮层内容 -->
    <!-- slot="content" 写法不建议使用，请使用 #content 写法 -->
    <div class="t-popup-demo-base-item">
      <t-popup>
        <t-button variant="outline">触发元素</t-button>
        <!-- <div slot="content">触发元素是指触发浮层内容显示的元素</div> -->
        <template #content>
          <div>触发元素是指触发浮层内容显示的元素</div>
        </template>
      </t-popup>
    </div>

    <!-- 使用 content 渲染函数输出浮层内容 -->
    <div class="t-popup-demo-base-item">
      <t-popup :content="renderPopupContent">
        <t-button variant="outline">浮层内容</t-button>
      </t-popup>
    </div>
  </div>
</template>

<script lang="jsx">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      renderPopupContent() {
        return <div>浮层内容是指浮层里面显示的全部内容，这里的浮层内容使用渲染函数定义</div>;
      },
    };
  },
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

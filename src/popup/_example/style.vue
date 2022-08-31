<template>
  <div>
    <div class="t-popup-demo-base-item">
      <t-popup
        content="浮层拥有自定义类名，可以自定义浮层样式"
        overlay-class-name="tdesign-demo__custom-popup"
        placement="bottom"
      >
        <t-button variant="outline">自定义浮层类名</t-button>
      </t-popup>
    </div>

    <div class="t-popup-demo-base-item">
      <t-popup content="浮层宽度是固定的，不会随内容变化而变化" :overlay-style="{ width: '300px' }" placement="bottom">
        <t-button variant="outline">固定浮层宽度</t-button>
      </t-popup>
    </div>

    <div class="t-popup-demo-base-item">
      <t-popup
        content="可以设置浮层最大宽度，当内容超出最大宽度时，文本内容才会换行"
        :overlay-style="{ maxWidth: '250px' }"
        placement="bottom"
      >
        <t-button variant="outline">浮层最大宽度</t-button>
      </t-popup>
    </div>

    <div class="t-popup-demo-base-item">
      <t-popup
        content="overlayStyle 作为函数使用，可以让浮层内容和触发元素同宽"
        :overlay-style="(triggerElem) => ({ width: `${triggerElem.offsetWidth}px` })"
        placement="bottom"
      >
        <t-button variant="outline">浮层和触发元素同宽</t-button>
      </t-popup>
    </div>
  </div>
</template>

<style scoped>
.tdesign-demo__custom-popup {
  font-weight: 500;
}
.t-popup-demo-base-item {
  display: inline-block;
}
.t-popup-demo-base-item + .t-popup-demo-base-item {
  margin-left: 30px;
}
</style>

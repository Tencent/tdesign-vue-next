<template>
  <div class="tdesign-tooltip-placement">
    <t-tooltip
      class="placement top center"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      placement="top"
      :overlay-style="{ width: '200px' }"
      show-arrow
      trigger="click"
    >
      <t-button variant="outline"> top </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement top left"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      placement="top-left"
      :overlay-style="{ width: '200px' }"
      show-arrow
    >
      <t-button variant="outline"> top-left </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement top right"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ width: '200px' }"
      placement="top-right"
      show-arrow
    >
      <t-button variant="outline"> top-right </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement bottom center"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ width: '200px' }"
      placement="bottom"
      show-arrow
    >
      <t-button variant="outline"> bottom </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement bottom left"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      placement="bottom-left"
      :overlay-style="{ width: '200px' }"
      show-arrow
    >
      <t-button variant="outline"> bottom-left </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement bottom right"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ width: '200px' }"
      placement="bottom-right"
      show-arrow
    >
      <t-button variant="outline"> bottom-right </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement align"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ width: '200px' }"
      placement="left"
      show-arrow
    >
      <t-button variant="outline"> left </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement top-align"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ width: '200px' }"
      placement="left-top"
      show-arrow
    >
      <t-button variant="outline"> left-top </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement bottom-align"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ width: '200px' }"
      placement="left-bottom"
      show-arrow
    >
      <t-button variant="outline"> left-bottom </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement right-full align"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ width: '200px' }"
      placement="right"
      show-arrow
    >
      <t-button variant="outline"> right </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement right-full top-align"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ width: '200px' }"
      placement="right-top"
      show-arrow
    >
      <t-button variant="outline"> right-top </t-button>
    </t-tooltip>
    <t-tooltip
      class="placement right-full bottom-align"
      content="文字提示仅展示文本内容文字提示仅展示文本内容"
      :overlay-style="{ width: '200px' }"
      placement="right-bottom"
      show-arrow
    >
      <t-button variant="outline"> right-bottom </t-button>
    </t-tooltip>
  </div>
</template>
<script></script>
<style lang="less" scoped>
.container {
  margin: 0 auto;
  width: 500px;
  height: 260px;
  position: relative;
}
.placement {
  position: absolute;
  &.top {
    top: 0;
  }
  &.center {
    left: 42%;
  }
  &.left {
    left: 70px;
  }
  &.right {
    right: 70px;
  }
  &.bottom {
    bottom: 0;
  }
  &.align {
    top: 42%;
  }
  &.top-align {
    top: 50px;
  }
  &.bottom-align {
    bottom: 50px;
  }
  &.right-full {
    right: 0px;
  }
}
</style>

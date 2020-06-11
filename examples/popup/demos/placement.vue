<template>
  <div class="container">
    <t-popup
      class="placement-top"
      content="这是popup内容"
      placement="top"
      visibleArrow
      destroyOnHide
    >
      top
    </t-popup>
    <t-popup
      class="placement-topLeft"
      content="这是popup内容"
      placement="topLeft"
      visibleArrow
      destroyOnHide
    >
      topLeft
    </t-popup>
    <t-popup
      class="placement-topRight"
      content="这是popup内容"
      placement="topRight"
      visibleArrow
      destroyOnHide
    >
      topRight
    </t-popup>
    <t-popup
      class="placement-bottom"
      content="这是popup内容"
      placement="bottom"
      visibleArrow
      destroyOnHide
    >
      bottom
    </t-popup>
    <t-popup
      class="placement-bottomLeft"
      content="这是popup内容"
      placement="bottomLeft"
      visibleArrow
      destroyOnHide
    >
      bottomLeft
    </t-popup>
    <t-popup
      class="placement-bottomRight"
      content="这是popup内容"
      placement="bottomRight"
      visibleArrow
      destroyOnHide
    >
      bottomRight
    </t-popup>
    <t-popup
      class="placement-left"
      content="这是popup内容"
      placement="left"
      visibleArrow
      destroyOnHide
    >
      left
    </t-popup>
    <t-popup
      class="placement-leftTop"
      content="这是popup内容"
      placement="leftTop"
      visibleArrow
      destroyOnHide
    >
      leftTop
    </t-popup>
    <t-popup
      class="placement-leftBottom"
      content="这是popup内容"
      placement="leftBottom"
      visibleArrow
      destroyOnHide
    >
      leftBottom
    </t-popup>
    <t-popup
      class="placement-right"
      content="这是popup内容"
      placement="right"
      visibleArrow
      destroyOnHide
    >
      right
    </t-popup>
    <t-popup
      class="placement-rightTop"
      content="这是popup内容"
      placement="rightTop"
      visibleArrow
      destroyOnHide
    >
      rightTop
    </t-popup>
    <t-popup
      class="placement-rightBottom"
      content="这是popup内容"
      placement="rightBottom"
      visibleArrow
      destroyOnHide
    >
      rightBottom
    </t-popup>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  width: 400px;
  height: 300px;
  position: relative;
}
.placement-top {
  position: absolute;
  top: 0;
  left: 45%;
}
.placement-topLeft {
  position: absolute;
  top: 0;
  left: 70px;
}
.placement-topRight {
  position: absolute;
  top: 0;
  right: 70px;
}
.placement-bottom {
  position: absolute;
  bottom: 0;
  left: 45%;
}
.placement-bottomLeft {
  position: absolute;
  bottom: 0;
  left: 70px;
}
.placement-bottomRight {
  position: absolute;
  bottom: 0;
  right: 70px;
}
.placement-left {
  position: absolute;
  left: 12px;
  top: 45%;
  transform: rotate(-90deg);
}
.placement-leftTop {
  position: absolute;
  left: 0;
  top: 50px;
  transform: rotate(-90deg);
}
.placement-leftBottom {
  position: absolute;
  left: -12px;
  bottom: 50px;
  transform: rotate(-90deg);
}
.placement-right {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: rotate(90deg);
}
.placement-rightTop {
  position: absolute;
  right: 0;
  top: 50px;
  transform: rotate(90deg);
}
.placement-rightBottom {
  position: absolute;
  right: -12px;
  bottom: 50px;
  transform: rotate(90deg);
}
</style>


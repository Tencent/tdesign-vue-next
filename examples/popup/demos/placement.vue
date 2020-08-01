<template>
  <div class="container">
    <t-popup
      class="placement-top"
      content="这是popup内容"
      placement="top"
      visibleArrow
      destroyOnHide
    >
      <t-button>top</t-button>
    </t-popup>
    <t-popup
      class="placement-topLeft"
      content="这是popup内容"
      placement="topLeft"
      visibleArrow
      destroyOnHide
    >
      <t-button>topLeft</t-button>
    </t-popup>
    <t-popup
      class="placement-topRight"
      content="这是popup内容"
      placement="topRight"
      visibleArrow
      destroyOnHide
    >
      <t-button>topRight</t-button>
    </t-popup>
    <t-popup
      class="placement-bottom"
      content="这是popup内容"
      placement="bottom"
      visibleArrow
      destroyOnHide
    >
      <t-button>bottom</t-button>
    </t-popup>
    <t-popup
      class="placement-bottomLeft"
      content="这是popup内容"
      placement="bottomLeft"
      visibleArrow
      destroyOnHide
    >
      <t-button>bottomLeft</t-button>
    </t-popup>
    <t-popup
      class="placement-bottomRight"
      content="这是popup内容"
      placement="bottomRight"
      visibleArrow
      destroyOnHide
    >
      <t-button>bottomRight</t-button>
    </t-popup>
    <t-popup
      class="placement-left"
      content="这是popup内容"
      placement="left"
      visibleArrow
      destroyOnHide
    >
      <t-button>left</t-button>
    </t-popup>
    <t-popup
      class="placement-leftTop"
      content="这是popup内容"
      placement="leftTop"
      visibleArrow
      destroyOnHide
    >
      <t-button>leftTop</t-button>
    </t-popup>
    <t-popup
      class="placement-leftBottom"
      content="这是popup内容"
      placement="leftBottom"
      visibleArrow
      destroyOnHide
    >
      <t-button>leftBottom</t-button>
    </t-popup>
    <t-popup
      class="placement-right"
      content="这是popup内容"
      placement="right"
      visibleArrow
      destroyOnHide
    >
      <t-button>right</t-button>
    </t-popup>
    <t-popup
      class="placement-rightTop"
      content="这是popup内容"
      placement="rightTop"
      visibleArrow
      destroyOnHide
    >
      <t-button>rightTop</t-button>
    </t-popup>
    <t-popup
      class="placement-rightBottom"
      content="这是popup内容"
      placement="rightBottom"
      visibleArrow
      destroyOnHide
    >
      <t-button>rightBottom</t-button>
    </t-popup>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  width: 500px;
  height: 260px;
  position: relative;
}
.placement-top {
  position: absolute;
  top: 0;
  left: 42%;
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
  left: 42%;
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
  left: 0;
  top: 42%;
}
.placement-leftTop {
  position: absolute;
  left: 0;
  top: 50px;
}
.placement-leftBottom {
  position: absolute;
  left: -0;
  bottom: 50px;
}
.placement-right {
  position: absolute;
  right: 0;
  top: 42%;
}
.placement-rightTop {
  position: absolute;
  right: 0;
  top: 50px;
}
.placement-rightBottom {
  position: absolute;
  right: 0;
  bottom: 50px;
}
</style>


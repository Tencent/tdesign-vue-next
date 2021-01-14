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
      class="placement-top-left"
      content="这是popup内容"
      placement="top-left"
      visibleArrow
      destroyOnHide
    >
      <t-button>top-left</t-button>
    </t-popup>
    <t-popup
      class="placement-top-right"
      content="这是popup内容"
      placement="top-right"
      visibleArrow
      destroyOnHide
    >
      <t-button>top-right</t-button>
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
      class="placement-bottom-left"
      content="这是popup内容"
      placement="bottom-left"
      visibleArrow
      destroyOnHide
    >
      <t-button>bottom-left</t-button>
    </t-popup>
    <t-popup
      class="placement-bottom-right"
      content="这是popup内容"
      placement="bottom-right"
      visibleArrow
      destroyOnHide
    >
      <t-button>bottom-right</t-button>
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
      class="placement-left-top"
      content="这是popup内容"
      placement="left-top"
      visibleArrow
      destroyOnHide
    >
      <t-button>left-top</t-button>
    </t-popup>
    <t-popup
      class="placement-left-bottom"
      content="这是popup内容"
      placement="left-bottom"
      visibleArrow
      destroyOnHide
    >
      <t-button>left-bottom</t-button>
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
      class="placement-right-top"
      content="这是popup内容"
      placement="right-top"
      visibleArrow
      destroyOnHide
    >
      <t-button>right-top</t-button>
    </t-popup>
    <t-popup
      class="placement-right-bottom"
      content="这是popup内容"
      placement="right-bottom"
      visibleArrow
      destroyOnHide
    >
      <t-button>right-bottom</t-button>
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
.placement-top-left {
  position: absolute;
  top: 0;
  left: 70px;
}
.placement-top-right {
  position: absolute;
  top: 0;
  right: 70px;
}
.placement-bottom {
  position: absolute;
  bottom: 0;
  left: 42%;
}
.placement-bottom-left {
  position: absolute;
  bottom: 0;
  left: 70px;
}
.placement-bottom-right {
  position: absolute;
  bottom: 0;
  right: 70px;
}
.placement-left {
  position: absolute;
  left: 0;
  top: 42%;
}
.placement-left-top {
  position: absolute;
  left: 0;
  top: 50px;
}
.placement-left-bottom {
  position: absolute;
  left: -0;
  bottom: 50px;
}
.placement-right {
  position: absolute;
  right: 0;
  top: 42%;
}
.placement-right-top {
  position: absolute;
  right: 0;
  top: 50px;
}
.placement-right-bottom {
  position: absolute;
  right: 0;
  bottom: 50px;
}
</style>


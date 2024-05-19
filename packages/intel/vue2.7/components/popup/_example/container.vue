<template>
  <t-space>
    <t-space>
      <t-popup content="触发元素的父元素是组件根元素，通过 CSSSelector 定义" attach="#myPopup">
        <div id="myPopup">
          <t-button variant="outline">父元素为组件本身</t-button>
        </div>
      </t-popup>
    </t-space>
    <t-space id="second-popup">
      <t-popup content="触发元素的父元素是组件跟元素，通过 Function 定义" :attach="getAttach">
        <t-button variant="outline">父元素为其他元素</t-button>
      </t-popup>
    </t-space>
  </t-space>
</template>

<script>
export default {
  methods: {
    getAttach: () => document.querySelector('#second-popup'),
  },
};
</script>

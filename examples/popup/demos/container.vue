<template>
  <div>
    <div class="t-popup-demo-block">
      <t-popup id="myPopup" content="触发元素的父元素是组件根元素，通过 CSSSelector 定义" attach="#myPopup">
        <t-button variant="outline">父元素为组件本身</t-button>
      </t-popup>
    </div>
    <div id="second-popup" class="t-popup-demo-block">
      <t-popup content="触发元素的父元素是组件跟元素，通过 Funnction 定义" :attach="getAttach">
        <t-button variant="outline">父元素为其他元素</t-button>
      </t-popup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      getAttach: () => document.querySelector('#second-popup'),
    };
  },
});
</script>

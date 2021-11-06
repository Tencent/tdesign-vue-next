<template>
  <div>
    <t-popup
      id="myPopup"
      content="这是popup内容"
      trigger="click"
      :getOverlayContainer="getContainer"
    >
      <t-button>click我试试</t-button>
    </t-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      getContainer: () => document.getElementById('myPopup'),
    }
  },
});
</script>


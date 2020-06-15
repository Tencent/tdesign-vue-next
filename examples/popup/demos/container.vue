<template>
  <t-popup
    id="myPopup"
    content="这是popup内容"
    trigger="click"
    :getOverlayContainer="getContainer"
  >
    <t-button>click我试试</t-button>
  </t-popup>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  methods: {
    getContainer: () => document.getElementById('myPopup'),
  },
});
</script>


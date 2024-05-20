<template>
  <div class="affix-base">
    <t-affix :offset-top="top" :offset-bottom="20" ref="affix">
      <t-button>固钉</t-button>
    </t-affix>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const top = ref(140);
</script>

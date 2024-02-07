<template>
  <div>
    <t-slider v-model="size"></t-slider>
    <br />
    <t-space :size="size">
      <t-button>Button</t-button>
      <t-button>Button</t-button>
      <t-button>Button</t-button>
      <t-button>Button</t-button>
    </t-space>
  </div>
</template>

<script lang="ts" setup>
import { SpaceProps } from 'tdesign-vue-next';
import { ref } from 'vue';
const size = ref<SpaceProps['size']>(8);
</script>

<template>
  <t-space direction="vertical" size="large">
    <!--TODO: TYPE 仅用于测试功能！！-->
    <t-radio-group v-model="type" variant="default-filled">
      <t-radio-button value="canvas">canvas</t-radio-button>
      <t-radio-button value="svg">svg</t-radio-button>
    </t-radio-group>
    <t-radio-group v-model="shape" variant="default-filled">
      <t-radio-button value="square">square</t-radio-button>
      <t-radio-button value="mini-square">mini-square</t-radio-button>
      <t-radio-button value="rounded">rounded</t-radio-button>
      <t-radio-button value="dot">dot</t-radio-button>
    </t-radio-group>

    <t-space align="center">
      <span>scale</span>
      <t-slider
        v-model="scale"
        :min="0"
        :max="100"
        :disabled="shape === 'square' || shape === 'rounded'"
        class="pixel-style-slider"
      />
      <span class="pixel-style-scale-value">{{ scale }}</span>
    </t-space>

    <t-qrcode :value="value" :pixel-style="{ shape, scale }" :type="type" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { QRCodeProps } from 'tdesign-vue-next';

const value = 'https://tdesign.tencent.com/';
const type = ref<QRCodeProps['type']>('canvas');
const shape = ref('mini-square');
const scale = ref(75);
</script>

<style>
.pixel-style-slider {
  width: 240px;
}
.pixel-style-scale-value {
  width: 32px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
</style>

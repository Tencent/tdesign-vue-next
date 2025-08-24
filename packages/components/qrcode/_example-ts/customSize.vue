<template>
  <t-space direction="vertical">
    <t-space>
      <t-button :disabled="size <= minSize" @click="size -= 10">
        <template #icon>
          <MinusIcon />
        </template>
        Smaller
      </t-button>
      <t-button :disabled="size >= maxSize" @click="size += 10">
        <template #icon>
          <AddIcon />
        </template>
        Larger
      </t-button>
    </t-space>
    <t-qrcode
      level="H"
      :size="size"
      :icon-size="size / 4"
      value="https://tdesign.tencent.com/"
      icon="https://tdesign.gtimg.com/site/tdesign-logo.png"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MinusIcon, AddIcon } from 'tdesign-icons-vue-next';
import { QRCodeProps } from 'tdesign-vue-next';

const minSize = 40;
const maxSize = 300;

const size = ref<QRCodeProps['level']>(160);
</script>

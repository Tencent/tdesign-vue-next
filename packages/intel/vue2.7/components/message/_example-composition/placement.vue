<template>
  <t-space direction="vertical" size="large">
    <t-space>
      <t-input placeholder="请输入横向偏移量" v-model="offsetX"></t-input>
      <t-input placeholder="请输入纵向偏移量" v-model="offsetY"></t-input>
    </t-space>
    <div class="tdesign-tooltip-placement">
      <t-button variant="outline" @click="$message.success(msgList[0])" class="placement-center">center</t-button>
      <t-button variant="outline" @click="$message.info(msgList[1])" class="placement-top">top</t-button>
      <t-button variant="outline" @click="$message.warning(msgList[2])" class="placement-left">left</t-button>
      <t-button variant="outline" @click="$message.loading(msgList[3])" class="placement-right">right</t-button>
      <t-button variant="outline" @click="$message.warning(msgList[4])" class="placement-bottom">bottom</t-button>
      <t-button variant="outline" @click="$message.error(msgList[5])" class="placement-top-left">top-left</t-button>
      <t-button variant="outline" @click="$message.question(msgList[6])" class="placement-top-right"
      >top-right</t-button
      >
      <t-button variant="outline" @click="$message.warning(msgList[7])" class="placement-bottom-left"
      >bottom-left</t-button
      >
      <t-button variant="outline" @click="$message.warning(msgList[8])" class="placement-bottom-right"
      >bottom-right</t-button
      >
    </div>
  </t-space>
</template>

<script setup>
import { ref, computed } from 'vue';

const offsetX = ref('');
const offsetY = ref('');
const msgList = computed(() => [
  {
    content: '用户表示操作顺利达成',
    placement: 'center',
  },
  {
    content: '用户表示普通操作信息提示',
    placement: 'top',
  },
  {
    content: '用户表示操作引起一定后果',
    placement: 'left',
  },
  {
    content: '用于表示操作正在生效的过程中',
    placement: 'right',
  },
  {
    content: '用于表示操作正在生效的过程中',
    placement: 'bottom',
  },
  {
    content: '用户表示操作引起严重的后果',
    placement: 'top-left',
  },
  {
    content: '用于帮助用户操作的信息提示',
    placement: 'top-right',
  },
  {
    content: '用于表示操作正在生效的过程中',
    placement: 'bottom-left',
  },
  {
    content: '用于表示操作正在生效的过程中',
    placement: 'bottom-right',
  },
].map((item) => ({
  ...item,
  offset: [offsetX.value, offsetY.value],
})));
</script>

<style scoped>
/* .t-message-placement {
  margin: 0 auto;
  width: 500px;
  height: 260px;
  position: relative;
} */
.placement-top {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.placement-top-left {
  position: absolute;
  top: 0;
  left: 0;
}
.placement-top-right {
  position: absolute;
  top: 0;
  right: 0;
}
.placement-bottom {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.placement-bottom-left {
  position: absolute;
  bottom: 0;
  left: 0;
}
.placement-bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
}
.placement-left {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.placement-right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.placement-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

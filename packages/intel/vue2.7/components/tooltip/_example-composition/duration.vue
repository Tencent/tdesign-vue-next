<template>
  <t-space>
    <t-tooltip default-visible :content="`提示在 ${count} 秒后消失`" :duration="5000" :key="reset">
      <t-button variant="text" disabled>定时消失</t-button>
    </t-tooltip>
    <t-button variant="outline" @click="setTimer" v-if="!count">点击再次查看</t-button>
  </t-space>
</template>
<script setup>
import { onBeforeMount, ref, onBeforeUnmount } from 'vue';

const count = ref(0);
const reset = ref(true);
let timer;
const setTimer = () => {
  reset.value = !reset.value;
  count.value = 5;
  timer = setInterval(() => {
    count.value -= 1;
    if (count.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};
onBeforeMount(() => {
  setTimer();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

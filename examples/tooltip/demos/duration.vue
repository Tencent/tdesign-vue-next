<template>
  <div>
    <t-tooltip v-if="showing" default-visible :content="`提示在 ${timeout} 秒后消失`" :duration="5000">
      <t-button variant="outline" :disabled="showing" @click="init"> 定时消失 </t-button>
    </t-tooltip>
    <t-button v-else variant="outline" @click="init"> 点击查看 </t-button>
  </div>
</template>
<script setup>
import { ref, onUnmounted } from 'vue';

const timeout = ref(0);
const showing = ref(false);
let timer;

function init() {
  timeout.value = 5;
  showing.value = true;
  timer = setInterval(() => {
    timeout.value -= 1;
    if (timeout.value <= 0) {
      showing.value = false;
      clearInterval(timer);
    }
  }, 1000);
}

onUnmounted(() => {
  clearInterval(timer);
});
</script>

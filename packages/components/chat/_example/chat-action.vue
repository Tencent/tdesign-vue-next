<template>
  <div class="chat-action-content">
    <t-chat-action
      :is-good="isGood"
      :is-bad="isBad"
      content="它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。"
      :operation-btn="['good', 'bad', 'replay', 'copy', 'sound']"
      @operation="handleOperation"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
const isGood = ref(false);
const isBad = ref(false);
const handleOperation = (type, options) => {
  console.log(type, options);
  if (type === 'good') {
    isGood.value = !isGood.value;
    isBad.value = false;
  } else if (type === 'bad') {
    isBad.value = !isBad.value;
    isGood.value = false;
  }
};
</script>

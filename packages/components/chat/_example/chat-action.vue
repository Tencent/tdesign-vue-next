<template>
  <div class="chat-action-content">
    <t-chat-action
      :comment="comment"
      content="它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。"
      :operation-btn="['good', 'bad', 'replay', 'copy']"
      @operation="handleOperation"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
const comment = ref('');
const handleOperation = (type, options) => {
  console.log(type, options);
  comment.value = type;
};
</script>

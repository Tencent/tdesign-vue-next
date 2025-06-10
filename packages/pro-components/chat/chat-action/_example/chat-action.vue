<template>
  <div class="chat-action-content">
    <t-chat-action
      :comment="comment"
      content="它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。"
      :action-bar="['good', 'bad', 'replay', 'copy', 'share']"
      @actions="handleActions"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';
const comment = ref('');
const handleActions = (type, options) => {
  console.log(type, options);
  comment.value = type;
};
</script>

<template>
  <div>
    <t-tooltip
      :key="reset"
      default-visible
      :content="`提示在 ${count} 秒后消失`"
      :duration="5000"
    >
      <t-button
        variant="text"
        disabled
      >
        定时消失
      </t-button>
    </t-tooltip>
    <t-button
      v-if="!count"
      variant="outline"
      @click="setTimer"
    >
      点击再次查看
    </t-button>
  </div>
</template>
<script>
import {
  defineComponent, ref, onMounted, onUnmounted,
} from 'vue';

export default defineComponent({
  setup() {
    const count = ref(5);
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

    onMounted(() => {
      setTimer();
    });

    onUnmounted(() => {
      clearInterval(timer);
    });

    return {
      count,
      setTimer,
      reset,
    };
  },
});
</script>

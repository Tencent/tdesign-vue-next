<template>
  <t-chat-thinking
    :content="{
      title: title,
      text: displayText,
    }"
    :status="status"
    :max-height="100"
    :collapsed="collapsed"
    @collapsed-change="collapsedChangeHandle"
  />
</template>

<script>
import { defineComponent, ref, watch, onMounted, onUnmounted } from 'vue';

const fullText =
  '嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。那问题来了，这个定律是否适用于所有参考系呢？记得以前学过的参考系分惯性系和非惯性系。惯性系里，牛顿定律成立；非惯性系里，可能需要引入惯性力之类的修正。所以牛顿第一定律应该只在惯性参考系中成立，而在非惯性系中不适用，比如加速的电梯或者旋转的参考系，这时候物体会有看似无外力下的加速度，所以必须引入假想的力来解释。';

export default defineComponent({
  name: 'ThinkContentDemo',
  setup() {
    const displayText = ref('');
    const status = ref('pending');
    const title = ref('正在思考中...');
    const collapsed = ref(false);
    const timerRef = ref(null);
    const currentIndex = ref(0);
    const startTimeRef = ref(Date.now());

    // 打字效果函数
    const typeEffect = () => {
      if (currentIndex.value < fullText.length) {
        const char = fullText[currentIndex.value];
        currentIndex.value += 1;
        displayText.value += char;
        timerRef.value = setTimeout(typeEffect, 50);
        status.value = 'streaming';
      } else {
        // 计算耗时并更新状态
        const costTime = parseInt(((Date.now() - startTimeRef.value) / 1000).toString(), 10);
        title.value = `已完成思考（耗时${costTime}秒）`;
        status.value = 'complete';
      }
    };

    // 折叠状态变化处理
    const collapsedChangeHandle = (e) => {
      collapsed.value = e.detail;
    };

    // 监听status变化
    watch(status, (newStatus) => {
      if (newStatus === 'complete') {
        collapsed.value = true; // 内容结束输出后收起面板
      }
    });

    // 组件挂载时启动打字效果
    onMounted(() => {
      startTimeRef.value = Date.now();
      timerRef.value = setTimeout(typeEffect, 500);
    });

    // 组件卸载时清除定时器
    onUnmounted(() => {
      if (timerRef.value) clearTimeout(timerRef.value);
    });

    return {
      displayText,
      status,
      title,
      collapsed,
      collapsedChangeHandle,
    };
  },
});
</script>

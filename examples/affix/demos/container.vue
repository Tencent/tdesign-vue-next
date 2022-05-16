<template>
  <div class="affix-container">
    <div ref="affixContainerRef" class="affix-container-demo1">
      <div class="background">
        <t-affix
          ref="affixRef"
          :z-index="5"
          :offset-top="50"
          :offset-bottom="50"
          :container="getContainer"
          @fixed-change="handleFixedChange"
        >
          <t-button>affixed :{{ affixed }}</t-button>
        </t-affix>
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';

const affixed = ref(false);
const affixContainerRef = ref(null);
const affixRef = ref(null);

const getContainer = () => affixContainerRef.value;

const handleFixedChange = (_affixed, { top }) => {
  console.log('top', top);
  affixed.value = _affixed;
};

onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', affixRef.value.handleScroll);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', affixRef.value.handleScroll);
});
</script>

<style lang="less" scoped>
.affix-container {
  width: 100%;
  &-demo1 {
    border: 1px solid #e7e7e7;
    border-radius: 3px;
    height: 400px;
    overflow: auto;
    overscroll-behavior: none;
    .background {
      height: 1500px;
      padding-top: 700px;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAUklEQVQ4T2NkoBJ4/vx5AwMDw39GKpnHMGog5SE5GoajYUhGCIwmGzICDU0L7cLw6dOnoJKWYsDExGTPwMBwgPH58+f1xJj2798/gqW7tLR0AwAIU1bxCouWBwAAAABJRU5ErkJggg==);
    }
  }
}
</style>

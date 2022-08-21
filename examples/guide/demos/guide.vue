<template>
  <div class="guide-wrap-demo">
    <t-button @click="clickNextStep">新手引导</t-button>
    <div id="guide1" class="guide-item">guide1</div>
    <div id="guide2" class="guide-item">guide2</div>
    <div id="guide3" class="guide-item">guide3</div>
    <div id="guide4" class="guide-item">guide4</div>
    <t-guide
      :current="current"
      :steps="steps"
      @click-prev-step="clickPrevStep"
      @click-next-step="clickNextStep"
      @finish="onFinish"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const current = ref(-1);

const clickPrevStep = () => {
  current.value -= 1;
};

const clickNextStep = () => {
  current.value += 1;
};

const onFinish = () => {
  console.log('完成');
};

const steps = [
  { element: '#guide1' },
  { element: '#guide2' },
  { element: '#guide3' },
  { element: '#guide4', mode: 'dialog' },
];
</script>
<style scoped>
.guide-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aqua;
}

#guide1 {
  width: 100px;
  height: 100px;
}

#guide2 {
  margin-top: 400px;
  margin-left: 80%;
  width: 200px;
  height: 200px;
}

#guide3 {
  margin-top: 1400px;
  margin-left: 20%;
  width: 400px;
  height: 400px;
}
</style>

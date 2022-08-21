<template>
  <div class="guide-wrap-demo">
    <t-button @click="handelStart">新手引导</t-button>
    <div id="guide1" class="guide-item">guide1</div>
    <div id="guide2" class="guide-item">guide2</div>
    <div id="guide3" class="guide-item">guide3</div>
    <div id="guide4" class="guide-item">guide4</div>
    <t-guide
      v-model="current"
      :steps="steps"
      @change="handleChange"
      @click-prev-step="handelClickPrevStep"
      @click-next-step="handleClickNextStep"
      @finish="handleFinish"
      @skip="handleSkip"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const steps = [
  { element: '#guide1' },
  { element: '#guide2', mode: 'dialog' },
  { element: '#guide3' },
  { element: '#guide4' },
];

const current = ref(-1);

const handelStart = () => {
  current.value = 0;
};

const handleChange = (current, total, context) => {
  console.log(current, total, context);
};
const handelClickPrevStep = (prev, current, total, context) => {
  console.log(prev, current, total, context);
};

const handleClickNextStep = (next, current, total, context) => {
  console.log(next, current, total, context);
};

const handleFinish = (current, total, context) => {
  console.log(current, total, context);
};

const handleSkip = (current, total, context) => {
  console.log(current, total, context);
};
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
  margin-top: 200px;
  margin-left: 20%;
  width: 160px;
  height: 160px;
}

#guide3 {
  margin-top: 400px;
  margin-left: 80%;
  width: 200px;
  height: 200px;
}

#guide4 {
  margin-top: 1400px;
  margin-left: 20%;
  width: 400px;
  height: 400px;
}
</style>

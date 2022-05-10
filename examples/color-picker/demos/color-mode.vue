<template>
  <div class="tdesign-demo-block-row">
    <div class="item">
      <h5>默认（单色 + 线性渐变）</h5>
      <t-color-picker v-model="color1" format="CSS" />
    </div>
    <div class="item">
      <h5>仅单色模式</h5>
      <t-color-picker v-model="color2" format="CSS" :color-modes="['monochrome']" />
    </div>
    <div style="width: 100%"></div>
    <div class="item">
      <h5>仅线性渐变模式</h5>
      <t-color-picker v-model="color3" format="CSS" :color-modes="['linear-gradient']" />
    </div>
    <div v-for="(it, idx) in list" :key="idx" class="item">
      <h5>{{ it.color }}</h5>
      <t-color-picker v-model="it.color" format="CSS" @change="change" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const color1 = ref('#0052d9');
const color2 = ref('#0052d9');
const color3 = ref('linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)');
const list = ref([{ color: '#F00' }, { color: 'green' }]);
const change = (v) => {
  console.log(v);
};
</script>
<style scoped>
.item {
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
}
.item h5 {
  font-weight: normal;
  margin-bottom: 10px;
}
</style>

<template>
  <t-cascader
    v-model="value"
    :options="options"
    :scroll="{ type: 'virtual', bufferSize: 5, threshold: 10 }"
    clearable
    multiple
    @change="onChange"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue';

const options = ref([]);
const value = ref(['20.1.20']);

const onChange = (val, context) => {
  console.log(val, context);
};

function initOptions() {
  const list = [];
  for (let i = 1; i < 100; i++) {
    const children = [];
    for (let j = 1; j < 100; j++) {
      const child = [];
      for (let k = 1; k < 100; k++) {
        child.push({
          label: `子选项${i}.${j}.${k}`,
          value: `${i}.${j}.${k}`,
        });
      }
      children.push({
        label: `子选项${i}.${j}`,
        value: `${i}.${j}`,
        children: child,
      });
    }

    list.push({
      label: `选项${i}`,
      value: `${i}`,
      children,
    });
  }
  return list;
}

onMounted(() => {
  const data = initOptions();
  options.value = data;
});
</script>

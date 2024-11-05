<template>
  <t-space>
    <t-switch
      v-model="resolveChecked"
      :loading="loadingResolve"
      :before-change="beforeChangeResolve"
      @change="onChangeResolve"
    />
    <t-switch
      v-model="rejectChecked"
      :loading="loadingReject"
      :before-change="beforeChangeReject"
      @change="onChangeReject"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const resolveChecked = ref(true);
const rejectChecked = ref(true);
const loadingResolve = ref(false);
const loadingReject = ref(false);

const onChangeResolve = (v) => {
  console.log(v);
};

const onChangeReject = (v) => {
  console.log(v);
};

const beforeChangeResolve = () => {
  loadingResolve.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      loadingResolve.value = false;
      resolve(true);
    }, 1000);
  });
};

const beforeChangeReject = () => {
  loadingReject.value = true;
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      loadingReject.value = false;
      reject(new Error('reject'));
    }, 1000);
  });
};
</script>

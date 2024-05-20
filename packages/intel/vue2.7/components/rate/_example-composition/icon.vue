<template>
  <t-space direction="vertical">
    <t-rate v-model="value1">
      <template #icon>
        <star-icon />
      </template>
    </t-rate>
    <t-rate v-model="value2">
      <template #icon>
        <logo-github-icon />
      </template>
    </t-rate>
    <t-rate v-model="value3" allow-half color="var(--td-error-color-7)">
      <template #icon>
        <heart-filled-icon />
      </template>
    </t-rate>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';
import { StarIcon, LogoGithubIcon, HeartFilledIcon } from 'tdesign-icons-vue';

const value1 = ref(1);
const value2 = ref(2);
const value3 = ref(2.5);
</script>

<template>
  <t-space direction="vertical">
    <t-rate default-value="1">
      <template #icon>
        <star-icon />
      </template>
    </t-rate>
    <t-rate default-value="2">
      <template #icon>
        <logo-github-icon />
      </template>
    </t-rate>
    <t-rate default-value="2.5" allow-half color="var(--td-error-color-7)">
      <template #icon>
        <heart-filled-icon />
      </template>
    </t-rate>
  </t-space>
</template>
<script setup lang="jsx">
import { StarIcon, LogoGithubIcon, HeartFilledIcon } from 'tdesign-icons-vue-next';
</script>

<template>
  <t-space direction="vertical">
    <t-rate :default-value="1">
      <template #icon="iconProps">
        <star-icon v-bind="iconProps" />
      </template>
    </t-rate>
    <t-rate :default-value="2">
      <template #icon="iconProps">
        <logo-github-icon v-bind="iconProps" />
      </template>
    </t-rate>
    <t-rate :default-value="2.5" allow-half color="var(--td-error-color-7)">
      <template #icon="iconProps">
        <heart-filled-icon v-bind="iconProps" />
      </template>
    </t-rate>
  </t-space>
</template>
<script lang="tsx" setup>
import { StarIcon, LogoGithubIcon, HeartFilledIcon } from 'tdesign-icons-vue-next';
</script>

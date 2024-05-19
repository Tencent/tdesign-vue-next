<template>
  <t-space direction="vertical">
    <t-space break-line>
      <p>How do you feel today?</p>
      <icon name="sneer" @click="onIconClose" />
      <icon name="unhappy" />
      <icon name="excited" />
      <icon name="surprised" />
      <icon name="giggle" />
    </t-space>
    <t-space break-line align="center">
      <p>What's your favourite food?</p>
      <icon name="tangerinr" color="orange" />
      <icon name="bamboo-shoot" color="green" />
      <icon name="apple" color="red" />
      <icon name="milk" color="#0052D9" />
      <icon name="peach" color="pink" />
    </t-space>
    <t-space break-line>
      <p>How much icons does TDesign Icon includes?</p>
      <icon name="numbers-1" style="color: var(--td-brand-color-5)" />
      <icon name="numbers-2" style="color: var(--td-brand-color-6)" />
      <icon name="numbers-0" style="color: var(--td-brand-color-7)" />
      <icon name="numbers-3" style="color: var(--td-brand-color-8)" />
    </t-space>
  </t-space>
</template>
<script setup>
import { Icon } from 'tdesign-icons-vue-next';

const onIconClose = () => {
  console.log('icon was clicked.');
};
</script>

<template>
  <t-space direction="vertical">
    <t-space break-line>
      <p>How do you feel today?</p>
      <icon-font name="sneer" />
      <icon-font name="unhappy" />
      <icon-font name="excited" />
      <icon-font name="surprised" />
      <icon-font name="giggle" />
    </t-space>
    <t-space break-line>
      <p>What's your favourite food?</p>
      <icon-font name="tangerinr" style="color: orange" />
      <icon-font name="bamboo-shoot" style="color: green" />
      <icon-font name="apple" style="color: red" />
      <icon-font name="milk" style="color: #0052d9" />
      <icon-font name="peach" style="color: pink" />
    </t-space>
    <t-space break-line>
      <p>How much icons does TDesign Icon includes?</p>
      <icon-font name="numbers-1" style="color: var(--td-brand-color-5)" />
      <icon-font name="numbers-2" style="color: var(--td-brand-color-6)" />
      <icon-font name="numbers-0" style="color: var(--td-brand-color-7)" />
      <icon-font name="numbers-3" style="color: var(--td-brand-color-8)" />
    </t-space>
  </t-space>
</template>
<script setup>
import { IconFont } from 'tdesign-icons-vue-next';
</script>

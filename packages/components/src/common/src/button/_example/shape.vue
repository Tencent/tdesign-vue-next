<template>
  <t-space direction="vertical">
    <t-space>
      <t-button theme="primary" shape="rectangle" variant="base">填充按钮</t-button>
      <t-button theme="primary" shape="square" variant="base"><calendar-icon slot="icon" /></t-button>
      <t-button theme="primary" shape="round" variant="base">填充按钮</t-button>
      <t-button theme="primary" shape="circle" variant="base"><calendar-icon slot="icon" /></t-button>
    </t-space>
    <t-space>
      <t-button shape="rectangle" variant="outline">描边按钮</t-button>
      <t-button shape="square" variant="outline"><calendar-icon slot="icon" /></t-button>
      <t-button shape="round" variant="outline">描边按钮</t-button>
      <t-button shape="circle" variant="outline"><calendar-icon slot="icon" /></t-button>
    </t-space>
    <t-space>
      <t-button shape="rectangle" variant="dashed">虚框按钮</t-button>
      <t-button shape="square" variant="dashed"><calendar-icon slot="icon" /></t-button>
      <t-button shape="round" variant="dashed">虚框按钮</t-button>
      <t-button shape="circle" variant="dashed"><calendar-icon slot="icon" /></t-button>
    </t-space>
    <t-space>
      <t-button shape="rectangle" variant="text">文字按钮</t-button>
      <t-button shape="square" variant="text"><calendar-icon slot="icon" /></t-button>
      <t-button shape="round" variant="text">文字按钮</t-button>
      <t-button shape="circle" variant="text"><calendar-icon slot="icon" /></t-button>
    </t-space>
  </t-space>
</template>
<script setup>
import { CalendarIcon } from 'tdesign-icons-vue-next';
</script>

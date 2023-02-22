<template>
  <t-space style="transform: translateZ(0)">
    <div class="container"></div>
    <t-back-top container=".container" :visible-height="0" :offset="[750, 0]">
      <template #default>TEXT</template>
    </t-back-top>
    <t-back-top :visible-height="0" :offset="[700, 0]">
      <template #content>TEST TEXT</template>
    </t-back-top>
    <t-back-top container=".container" :visible-height="0" :offset="[650, 0]" content="返回顶部"> </t-back-top>
  </t-space>
</template>

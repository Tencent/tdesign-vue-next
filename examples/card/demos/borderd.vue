<template>
  <div class="tdesign-demo-block">
    <t-row :align="'middle'" justify="start" :gutter="16">
      <t-col :span="6">
        <t-card borderd> {{ infoMessage }} </t-card>
      </t-col>
    </t-row>
  </div>
</template>

<script setup lang="jsx">
const infoMessage = `这是一段很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长的内容示例。`;
</script>

<template>
  <div class="tdesign-demo-block demo-card">
    <t-row :align="'middle'" justify="start" :gutter="16">
      <t-col :span="6">
        <t-card :title="title" :actions="actions" :bordered="false" hover-shadow @actions="clickHandler">
          {{ infoMessage }}
        </t-card>
      </t-col>
    </t-row>
  </div>
</template>
<script setup lang="jsx">
import { MessagePlugin } from 'tdesign-vue-next';

const clickHandler = () => {
  MessagePlugin.success('操作');
};

const title = '标题';
const actions = '操作';
const infoMessage = `这是一段很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长很长很长很长
  很长很长很长很长很长很长很长很长很长很长很长的内容示例。`;
</script>
<style lang="less" scoped>
.demo-card {
  padding: 16px;
  background-color: rgba(230, 230, 230, 1);
}
</style>

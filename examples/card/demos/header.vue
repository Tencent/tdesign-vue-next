<template>
  <div class="tdesign-demo-block">
    <t-row :align="'middle'" justify="start" :gutter="16">
      <t-col :span="6">
        <t-card :title="title" hover-shadow>
          {{ infoMessage }}
          <template #actions>
            <a href="javascript:void(0)" @click="clickHandler">操作</a>
          </template>
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
